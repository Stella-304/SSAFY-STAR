package com.ssafy.star.api.service;

import com.ssafy.star.common.auth.enumeration.BadgeEnum;
import com.ssafy.star.common.auth.enumeration.LoginTypeEnum;
import com.ssafy.star.common.db.dto.request.*;
import com.ssafy.star.common.db.dto.response.BadgeStatusDto;
import com.ssafy.star.common.db.dto.response.UserDetailDto;
import com.ssafy.star.common.db.entity.AuthStatus;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.AuthStatusRepository;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.exception.CommonApiException;
import com.ssafy.star.common.provider.*;
import com.ssafy.star.common.util.RandValueMaker;
import com.ssafy.star.common.util.constant.CommonErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	// SecurityConfig에 BCryptPasswordEncoder를 반환하도록 Bean등록 되어있음
	private final PasswordEncoder passwordEncoder;
	private final RandValueMaker randValueMaker;
	private final TokenProvider tokenProvider;
	private final RedisProvider redisProvider;
	private final S3Provider s3Provider;
	private final AuthProvider authProvider;
	private final SmtpProvider smtpProvider;
	private final UserRepository userRepository;
	private final AuthStatusRepository authStatusRepository;

	@Override
	@Transactional
	public void registUser(UserRegistReqDto userRegistReqDto) {

		User user = User.builder()
			.email(userRegistReqDto.getEmail())
			.loginType(LoginTypeEnum.custom)
			.accountPwd(passwordEncoder.encode(userRegistReqDto.getAccountPwd()))
			.build();

		user.getAuthoritySet().add("ROLE_CLIENT");
		userRepository.save(user);
	}

	@Override
	@Transactional
	public String loginUser(UserLoginReqDto userLoginReqDto) {
		Optional<User> userOptional = userRepository.findByEmail(userLoginReqDto.getEmail());

		if (userOptional.isPresent()) {
			User user = userOptional.get();
			if (passwordEncoder.matches(userLoginReqDto.getAccountPwd(), user.getAccountPwd()) &&
				userLoginReqDto.getEmail().equals(user.getEmail())) {
				return tokenProvider.createTokenById(user.getId());
			}
		}

		return null;
	}

	@Override
	@Transactional
	public void logoutUser(String token) {
		if (tokenProvider.validateToken(token)) {
			redisProvider.setBlackList(token, tokenProvider.getUserIdFromToken(token),
				tokenProvider.getExpireTime(token).getTime() - new Date().getTime(), TimeUnit.MICROSECONDS);
		}
	}

	@Override
	@Transactional
	public UserDetailDto getDetailUser() {
		User user = userRepository.findById(authProvider.getUserIdFromPrincipal())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_ID_NOT_FOUND));
		boolean isCardRegistered = (user.getCard()) != null;
		return new UserDetailDto(user.getName(), user.getNickname(), user.getEmail(), user.isAuthorized(),
			isCardRegistered);
	}

	@Override
	@Transactional
	public void modifyUser(UserModifyReqDto userModifyReqDto) {
		User user = userRepository.findById(authProvider.getUserIdFromPrincipal())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_ID_NOT_FOUND));

		String nickname = userModifyReqDto.getNickname();

		if (nickname != null && !nickname.isBlank()) {
			user.setNickname(nickname);
		}
	}

	@Override
	@Transactional
	public void modifyPwdUser(String newPwd) {
		User user = userRepository.findById(authProvider.getUserIdFromPrincipal())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_ID_NOT_FOUND));
		user.setAccountPwd(passwordEncoder.encode(newPwd));
	}

	@Override
	public void modifyNameUser(String newName) {
		User user = userRepository.findById(authProvider.getUserIdFromPrincipal())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_ID_NOT_FOUND));
		user.setName(newName);
	}

	@Override
	@Transactional
	public void deleteUser() {
		userRepository.deleteById(authProvider.getUserIdFromPrincipal());
	}

	@Override
	@Transactional
	public boolean duplicateEmailCheck(String email) {
		return userRepository.existsByEmail(email);
	}

	@Override
	@Transactional
	public boolean duplicateNickNameCheck(String nickName) {
		return userRepository.existsByNickname(nickName);
	}

	@Override
	@Transactional
	public void sendVerificationCodeEmail(String email) {
		String authCode = randValueMaker.makeVerificationCode();
		redisProvider.set(email, authCode, 3L, TimeUnit.MINUTES);
		smtpProvider.emailAuth(email, authCode);
	}

	@Override
	@Transactional
	public boolean compareVerificationCodeEmail(EmailCompareReqDto emailCompareReqDto) {
		return String.valueOf(redisProvider.get(emailCompareReqDto.getEmail()))
			.equals(emailCompareReqDto.getUserCode());
	}

	@Override
	@Transactional
	public boolean findPwdUser(UserFindPwdReqDto userFindPwdReqDto) {

		String email = userFindPwdReqDto.getEmail();

		Optional<User> userOptional = userRepository.findByEmail(email);

		if (userOptional.isEmpty()) {
			return false;
		}

		User user = userOptional.get();
		String newPwd = randValueMaker.makeRandPwd();

		smtpProvider.sendPwd(email, newPwd);
		user.setAccountPwd(passwordEncoder.encode(newPwd));

		return true;
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void registBadge(BadgeRegistReqDto dto, MultipartFile file) throws IOException {
		String fileContentType = file.getContentType();
		if (!fileContentType.startsWith("image"))
			throw new CommonApiException(CommonErrorCode.FILE_NOT_VAILD);
		// 유저 정보 얻어옴.
		long userId = authProvider.getUserIdFromPrincipal();
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));
		// 이미지 S3에 저장하고, url 얻어옴
		String imageUrl = s3Provider.upload(file, "ssafy-star", user.getId());

		// 진행중인 뱃지 요청이 있으면 throw.
		List<AuthStatus> authStatusList = authStatusRepository.findByUserAndBadgeType(user, dto.getBadgeType());
		if (authStatusList.size() > 0)
			for (AuthStatus authStatus : authStatusList)
				if (!authStatus.isProcessStatus())
					throw new CommonApiException(CommonErrorCode.REQUEST_IN_PROGRESS);

		authStatusRepository.save(AuthStatus.builder()
			.user(user)
			.badgeType(dto.getBadgeType())
			.processStatus(false)
			.imageUrl(imageUrl)
			.build());
	}

	@Override
	public BadgeStatusDto searchBadgeStatus(String type) {
		BadgeEnum enumType = BadgeEnum.valueOf(type.toUpperCase());
		long userId = authProvider.getUserIdFromPrincipal();
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));
		List<AuthStatus> authStatusList = authStatusRepository.findByUserAndBadgeType(user, enumType);

		// 항상 마지막 요청이 최신이므로 계속 갱신해주자~
		String imageUrl = null;

		// 보낸 요청중에 하나라도 진행중인게 있으면.
		if (authStatusList.size() > 0) {
			for (AuthStatus authStatus : authStatusList) {
				imageUrl = authStatus.getImageUrl();
				if (!authStatus.isProcessStatus())
					return new BadgeStatusDto("IN_PROGRESS", imageUrl);
			}
		}

		// 인증이 마쳐진 경우.
		if (enumType == BadgeEnum.COMPANY && user.isCompanyIsAuthorized())
			return new BadgeStatusDto("FINISHED", imageUrl);
		if (enumType == BadgeEnum.SSAFY && user.isAuthorized())
			return new BadgeStatusDto("FINISHED", imageUrl);

		// 모든 요청이 거절당한경우(요청을 하나도 안보냈거나).
		// imageUrl이 null이면 요청을 하나도 안보낸거.
		// imageUrl이 있으면, 마지막 요청까지 거절당한거.
		return new BadgeStatusDto("NO_REQUEST", imageUrl);
	}

	@Override
	public boolean searchCardIsRegist() {
		long userId = authProvider.getUserIdFromPrincipal();
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));
		return user.getCard() != null;
	}


	@Override
	public List<String> getRoleListUser() {
		return userRepository.findAllRolesById(authProvider.getUserIdFromPrincipal())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));
	}
}
