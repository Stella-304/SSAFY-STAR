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
	public int registUser(UserRegistReqDto userRegistReqDto) {

		String accountId = userRegistReqDto.getAccountId();
		String nickname = userRegistReqDto.getNickname();

		if (userRepository.existsByAccountId(accountId)) { return 1; }
		if (userRepository.existsByNickname(nickname)) { return 2; }

		User user = User.builder()
			.email(userRegistReqDto.getEmail())
			.name(userRegistReqDto.getName())
			.nickname(nickname)
			.loginType(LoginTypeEnum.custom)
			.accountId(accountId)
			.accountPwd(passwordEncoder.encode(userRegistReqDto.getAccountPwd()))
			.build();

		user.getAuthoritySet().add("ROLE_CLIENT");
		userRepository.save(user);

		return 3;
	}

	@Override
	@Transactional
	public String loginUser(UserLoginReqDto userLoginReqDto) {
		Optional<User> userOptional = userRepository.findByAccountId(userLoginReqDto.getAccountId());
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			if (passwordEncoder.matches(userLoginReqDto.getAccountPwd(), user.getAccountPwd()) &&
				userLoginReqDto.getAccountId().equals(user.getAccountId())) {
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
		boolean isCardRegistered= (user.getCard())!=null;
		return new UserDetailDto(user.getName(),user.getNickname() ,user.getEmail(), user.isAuthorized(),isCardRegistered);
	}

	@Override
	@Transactional
	public String getUser() {
		return userRepository.findNicknameById(authProvider.getUserIdFromPrincipal());
	}

	@Override
	@Transactional
	public void modifyUser(UserModifyReqDto userModifyReqDto) {
		User user = userRepository.findById(authProvider.getUserIdFromPrincipal())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_ID_NOT_FOUND));

		String nickname = userModifyReqDto.getNickname();
		String name = userModifyReqDto.getName();

		if (nickname != null) {
			user.setNickname(nickname);
		}
		if (name != null) {
			user.setName(name);
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
	public String findIdUser(String email) {

		Optional<User> userOptional = userRepository.findByEmail(email);

		if (userOptional.isPresent()) {
			User user = userOptional.get();
			String accountId = user.getAccountId();
			// 아이디 길이는 보장되어있음
			return accountId.substring(0, accountId.length() - 3) + "**";
		}

		return null;
	}

	@Override
	@Transactional
	public boolean findPwdUser(UserFindPwdReqDto userFindPwdReqDto) {

		String accountId = userFindPwdReqDto.getAccountId();
		String email = userFindPwdReqDto.getEmail();

		Optional<User> userOptional = userRepository.findByAccountIdAndEmail(accountId, email);

		if(userOptional.isEmpty()) { return false; }

		User user = userOptional.get();
		String newPwd = randValueMaker.makeRandPwd();

		smtpProvider.sendPwd(email, randValueMaker.makeRandPwd());
		user.setAccountPwd(passwordEncoder.encode(newPwd));

		return true;
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void registBadge(BadgeRegistReqDto dto, MultipartFile file) throws IOException {
		String fileContentType = file.getContentType();
		System.out.println(fileContentType);
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
		BadgeEnum enumType = BadgeEnum.valueOf(type);
		long userId = authProvider.getUserIdFromPrincipal();
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));
		List<AuthStatus> authStatusList = authStatusRepository.findByUserAndBadgeType(user, enumType);

		// 인증이 마쳐진 경우.
		if (enumType == BadgeEnum.COMPANY && user.isCompanyIsAuthorized())
			return new BadgeStatusDto("FINISHED");
		if (enumType == BadgeEnum.SSAFY && user.isAuthorized())
			return new BadgeStatusDto("FINISHED");

		// 보낸 요청중에 하나라도 진행중인게 있으면.
		if (authStatusList.size() > 0)
			for (AuthStatus authStatus : authStatusList)
				if (!authStatus.isProcessStatus())
					return new BadgeStatusDto("IN_PROGRESS");

		// 모든 요청이 거절당한경우(요청을 하나도 안보냈거나).
		return new BadgeStatusDto("NO_REQUEST");
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
