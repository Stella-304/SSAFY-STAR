package com.ssafy.star.api.service;

import com.ssafy.star.common.auth.enumeration.BadgeEnum;
import com.ssafy.star.common.auth.enumeration.LoginTypeEnum;
import com.ssafy.star.common.auth.info.UserAccount;
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
import lombok.extern.slf4j.Slf4j;

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
@Slf4j
public class UserServiceImpl implements UserService {

	// SecurityConfig에 BCryptPasswordEncoder를 반환하도록 Bean등록 되어있음
	final PasswordEncoder passwordEncoder;
	final RandValueMaker randValueMaker;
	final TokenProvider tokenProvider;
	final RedisProvider redisProvider;
	final S3Provider s3Provider;
	final AuthProvider authProvider;
	final SmtpProvider smtpProvider;
	final UserRepository userRepository;
	final AuthStatusRepository authStatusRepository;

	@Override
	public boolean registUser(UserRegistReqDto userRegistReqDto) {

		if (userRepository.existsByUserAccountAccountId(userRegistReqDto.getAccountId())) {
			return false;
		}

		User user = User.builder()
			.email(userRegistReqDto.getEmail())
			.nickname(String.valueOf(userRegistReqDto.getNickname()))
			.loginType(LoginTypeEnum.custom)
			.userAccount(UserAccount.builder()
				.accountId(userRegistReqDto.getAccountId())
				.accountPwd(passwordEncoder.encode(userRegistReqDto.getAccountPwd()))
				.build())
			.build();

		user.getAuthoritySet().add("ROLE_CLIENT");

		userRepository.save(user);
		return true;
	}

	@Override
	public String loginUser(UserLoginReqDto userLoginReqDto) {

		Optional<User> userOptional = userRepository.findByUserAccountAccountId(userLoginReqDto.getAccountId());
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			UserAccount userAccount = user.getUserAccount();

			if (passwordEncoder.matches(userLoginReqDto.getAccountPwd(), userAccount.getAccountPwd()) &&
				userLoginReqDto.getAccountId().equals(userAccount.getAccountId())) {
				return tokenProvider.createTokenById(user.getId());
			}
		}
		return null;
	}

	@Override
	public void logoutUser(String token) {
		if (tokenProvider.validateToken(token)) {
			redisProvider.setBlackList(token, tokenProvider.getUserIdFromToken(token),
				tokenProvider.getExpireTime(token).getTime() - new Date().getTime(), TimeUnit.MICROSECONDS);
		}
	}

	@Override
	public UserDetailDto getDetailUser() {
		User user = userRepository.findById(authProvider.getUserIdFromPrincipal())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_ID_NOT_FOUND));
		return new UserDetailDto(user.getName(), user.getEmail(), user.isAutorized());
	}

	@Override
	public String getUser() {
		return userRepository.findNicknameById(authProvider.getUserIdFromPrincipal());
	}

	@Override
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
	public void modifyPwdUser(String newPwd) {
		User user = userRepository.findById(authProvider.getUserIdFromPrincipal())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_ID_NOT_FOUND));
		user.getUserAccount().setAccountPwd(passwordEncoder.encode(newPwd));
	}

	@Override
	public void deleteUser() {
		userRepository.deleteById(authProvider.getUserIdFromPrincipal());
	}

	@Override
	public boolean duplicateEmailCheck(String email) {
		return userRepository.existsByEmail(email);
	}

	@Override
	public void sendVerificationCodeEmail(String email) {
		String authCode = randValueMaker.makeVerificationCode();
		redisProvider.set(email, authCode, 3L, TimeUnit.MINUTES);
		smtpProvider.emailAuth(email, authCode);
	}

	@Override
	public boolean compareVerificationCodeEmail(EmailCompareReqDto emailCompareReqDto) {
		return String.valueOf(redisProvider.get(emailCompareReqDto.getEmail()))
			.equals(emailCompareReqDto.getUserCode());
	}

	@Override
	public String findIdUser(String email) {

		Optional<User> userOptional = userRepository.findByEmail(email);

		if (userOptional.isPresent()) {
			User user = userOptional.get();
			String accountId = user.getUserAccount().getAccountId();
			// 아이디 길이는 보장되어있음
			return accountId.substring(0, accountId.length() - 3) + "**";
		}

		return null;
	}

	@Override
	public void findPwdUser(UserFindPwdReqDto userFindPwdReqDto) {

		String accountId = userFindPwdReqDto.getAccountiId();
		String email = userFindPwdReqDto.getEmail();

		Optional<User> userOptional = userRepository.findByUserAccountAccountIdAndEmail(accountId, email);
		if (userOptional.isPresent()) {

			User user = userOptional.get();
			String newPwd = randValueMaker.makeRandPwd();

			smtpProvider.sendPwd(email, randValueMaker.makeRandPwd());
			user.getUserAccount().setAccountPwd(passwordEncoder.encode(newPwd));
			userRepository.save(user);
		}
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
		if (enumType == BadgeEnum.COMPANY && user.isCompanyIsAutorized())
			return new BadgeStatusDto("FINISHED");
		if (enumType == BadgeEnum.SSAFY && user.isAutorized())
			return new BadgeStatusDto("FINISHED");

		// 보낸 요청중에 하나라도 진행중인게 있으면.
		if (authStatusList.size() > 0)
			for (AuthStatus authStatus : authStatusList)
				if (!authStatus.isProcessStatus())
					return new BadgeStatusDto("IN_PROGRESS");

		// 모든 요청이 거절당한경우(요청을 하나도 안보냈거나).
		return new BadgeStatusDto("NO_REQUEST");
	}

}
