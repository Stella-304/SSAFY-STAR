package com.ssafy.star.api.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.star.common.db.dto.response.BadgeListDto;
import com.ssafy.star.common.db.dto.response.LandingNumberDto;
import com.ssafy.star.common.db.entity.AuthStatus;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.AuthStatusRepository;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.exception.CommonApiException;
import com.ssafy.star.common.provider.SmtpProvider;
import com.ssafy.star.common.util.constant.CommonErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NumberServiceImpl implements NumberService {

	final UserRepository userRepository;
	final int ALL_SSAFY_COUNT = 7350;

	@Override
	public LandingNumberDto getLandingNumber() {
		List<User> user = userRepository.findAll();
		int useSiteAllCnt = user.size();
		int useSiteSsafyCnt = (int)user.stream().filter(x -> x.isAutorized()).count();
		return LandingNumberDto.builder()
			.allSsafyCount(ALL_SSAFY_COUNT)
			.useSiteAllCount(useSiteAllCnt)
			.useSiteSsafyCount(useSiteSsafyCnt)
			.build();
	}
}
