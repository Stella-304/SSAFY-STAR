package com.ssafy.star.common.auth.service;

import com.nimbusds.oauth2.sdk.util.StringUtils;
import com.ssafy.star.common.auth.enumeration.RoleEnum;
import com.ssafy.star.common.auth.enumeration.LoginTypeEnum;
import com.ssafy.star.common.auth.exception.CustomOAuth2Exception;
import com.ssafy.star.common.auth.info.*;
import com.ssafy.star.common.auth.principal.UserPrincipal;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.util.constant.CommonErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Log4j2
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	private final UserRepository userRepository;

	@Override
	@Transactional
	public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {

		OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
		try {
			return processOAuth2User(oAuth2UserRequest, oAuth2User);
		} catch (AuthenticationException e) {
			throw e;
		} catch (Exception e) {
			log.error(e.getLocalizedMessage());
			e.printStackTrace();
			throw new InternalAuthenticationServiceException(e.getMessage(), e.getCause());
		}
	}

	private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {

		//        Map<String, Object> mapForLog = oAuth2User.getAttributes();
		//        mapForLog.forEach((k, v) -> log.info("{} : {}", k,v));

		OAuth2UserInfo oAuth2UserInfo = getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(),
			oAuth2User.getAttributes()
		);

		if (StringUtils.isBlank(oAuth2UserInfo.getEmail()) || oAuth2UserInfo.getEmail().equals("null")) {
			throw new CustomOAuth2Exception(CommonErrorCode.NO_EMAIL_PROVIDED);
		}

		Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());

		User user;

		if (userOptional.isPresent()) {
			if (!userOptional.get()
				.getLoginType()
				.equals(LoginTypeEnum.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
				throw new CustomOAuth2Exception(CommonErrorCode.EMAIL_ALREADY_EXITS);
			}
			user = updateUser(userOptional.get(), oAuth2UserInfo);
			return UserPrincipal.createExistingUserPrincipal(user);
		} else {
			user = registerUser(oAuth2UserRequest, oAuth2UserInfo);
			return UserPrincipal.createNewUserPrincipal(user);
		}
	}

	public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {

		if (registrationId.equals(LoginTypeEnum.google.toString())) {
			return new GoogleOAuth2UserInfo(attributes);
		} else if (registrationId.equals(LoginTypeEnum.naver.toString())) {
			return new NaverOAuth2UserInfo(attributes);
		} else if (registrationId.equals(LoginTypeEnum.kakao.toString())) {
			return new KakaoOAuth2UserInfo(attributes);
		} else {
			log.error("지원하지 않는 소셜타입입니다. : {}", registrationId);
			throw new CustomOAuth2Exception(CommonErrorCode.BAD_SOCIAL_TYPE);
		}
	}

	private User registerUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {

		return userRepository.save(User.builder()
			.email(oAuth2UserInfo.getEmail())
			.name("ndn")
			.nickname(oAuth2UserInfo.getName())
			.loginType(LoginTypeEnum.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))
			.socialAuth(SocialAuth.builder()
				.providerId(oAuth2UserInfo.getId())
				.build())
			.authoritySet(Set.of("ROLE_" + RoleEnum.CLIENT))
			.build());

	}

	/*
	 * 기존 유저가 로그인 할 시, 소셜사이트 정보를 바탕으로 update 하고 싶다면 메소드 본문에 추가할 수 있음
	 * 현재는 처음에만 소셜 정보를 받아오고, 이후 사이트에서만 변경하므로 해당 코드 생략
	 * 필요하다면, constructor access level이 PROTECTED이므로 setter 사용시 오류 발생하므로 빌더를 사용해야 함
	 * @Author 이상학
	 */
	private User updateUser(User user, OAuth2UserInfo oAuth2UserInfo) {

		return userRepository.save(user);
	}

}