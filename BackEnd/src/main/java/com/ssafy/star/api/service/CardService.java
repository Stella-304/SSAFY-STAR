package com.ssafy.star.api.service;

import java.util.HashMap;
import java.util.List;

import com.ssafy.star.common.db.dto.request.CardRegistReqDto;
import com.ssafy.star.common.db.dto.request.CardUpdateReqDto;
import com.ssafy.star.common.db.dto.request.SearchConditionReqDto;
import com.ssafy.star.common.db.dto.response.CardDetailDto;
import com.ssafy.star.common.db.dto.response.ConstellationListDto;

public interface CardService {
	String updateBojTier();

	String getBojTier(String bojId);

	List<String> searchCompany(String query);

	// ConstellationListDto getCardList(SearchConditionReqDto searchConditionReqDto);
	// ConstellationListDto getCardListV1(String searchColumn, String searchValue, String searchValue2, String searchValue3);
    ConstellationListDto getCardList();
    ConstellationListDto getCardListV2(SearchConditionReqDto searchConditionReqDto);

	void registCard(CardRegistReqDto cardRegistReqDto);

	void updateCard(CardUpdateReqDto cardUpdateReqDto) throws Exception;

    CardDetailDto getMyCard();


}
