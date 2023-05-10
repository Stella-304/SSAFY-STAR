package com.ssafy.star.common.provider;

import com.ssafy.star.common.auth.principal.UserPrincipal;
import com.ssafy.star.common.exception.CommonApiException;
import com.ssafy.star.common.util.constant.CommonErrorCode;

import lombok.extern.log4j.Log4j2;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class AuthProviderImpl implements AuthProvider {

	@Override
	public UserPrincipal getUserPricipalFromAuthentication(Authentication authentication) {
		return (UserPrincipal)authentication.getPrincipal();
	}

	@Override
	public long getUserIdFromPrincipal() {

		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (String.valueOf(principal).equals("anonymousUser")) {
			throw new CommonApiException(CommonErrorCode.UNLOGINED_USER);
		}

		UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		return Long.parseLong(userDetails.getUsername());
	}

	@Override
	public long getUserIdFromPrincipalDefault() {
		try {
			return getUserIdFromPrincipal();
		} catch (CommonApiException e) {
			return -1L;
		}
	}
}
