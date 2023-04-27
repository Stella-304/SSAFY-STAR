package com.ssafy.star.api.service;

import java.util.List;

import com.ssafy.star.common.db.dto.request.CardRegistReqDto;
import com.ssafy.star.common.db.dto.request.CardUpdateReqDto;
import com.ssafy.star.common.db.dto.request.SearchConditionReqDto;
import com.ssafy.star.common.db.dto.response.ConstellationListDto;

public interface CardService {
    void updateBojTier(long userId);
    ConstellationListDto getCardList(SearchConditionReqDto searchConditionReqDto);

	List<String> searchCompany(String query);

    void registCard(CardRegistReqDto cardRegistReqDto);

    void updateCard(CardUpdateReqDto cardUpdateReqDto) throws  Exception;
}
