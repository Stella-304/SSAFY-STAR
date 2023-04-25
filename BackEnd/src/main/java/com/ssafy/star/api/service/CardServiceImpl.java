package com.ssafy.star.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.star.common.db.dto.response.ConstellationListDto;
import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.CompanyRepository;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.exception.CommonApiException;
import com.ssafy.star.common.provider.AuthProvider;
import com.ssafy.star.common.util.CallAPIUtil;
import com.ssafy.star.common.util.constant.CommonErrorCode;
import com.ssafy.star.common.util.constant.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

	final UserRepository userRepository;
	final CompanyRepository companyRepository;

	@Override
	@Transactional
	public void updateBojTier(long userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));

		Card card = Optional.ofNullable(user.getCard())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.NO_CARD_PROVIDED));

		String bojId = Optional.ofNullable(card.getBojId())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.NO_BOJ_ID_PROVIDED));

		String tier = CallAPIUtil.getUserTier(bojId);
		card.updateBojTier(tier);
	}

	@Override
	public ConstellationListDto getCardList() {
		//여기다가 구현을 해보자고~
		return new ConstellationListDto(null, null);
	}

	@Override
	public List<String> searchCompany(String query) {
		companyRepository.searchCompanyList(query).stream().forEach(System.out::println);
		return companyRepository.searchCompanyList(query);
	}
}
