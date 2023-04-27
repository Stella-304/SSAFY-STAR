package com.ssafy.star.api.service;

import java.util.List;

import com.ssafy.star.common.db.dto.request.CardRegistReqDto;
import com.ssafy.star.common.db.dto.request.CardUpdateReqDto;
import com.ssafy.star.common.db.dto.request.SearchConditionReqDto;
import com.ssafy.star.common.db.dto.response.ConstellationListDto;

public interface CardService {
	void updateBojTier();

	String getBojTier(String bojId);

	List<String> searchCompany(String query);

	ConstellationListDto getCardList(SearchConditionReqDto searchConditionReqDto);

	void registCard(CardRegistReqDto cardRegistReqDto);

	void updateCard(CardUpdateReqDto cardUpdateReqDto) throws Exception;

	boolean deleteCard(Long cardId);
}
