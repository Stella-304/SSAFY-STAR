package com.ssafy.star.common.db.repository.querydsl;

import com.ssafy.star.common.db.dto.request.SearchConditionReqDto;
import com.ssafy.star.common.db.dto.response.CardDetailDto;
import com.ssafy.star.common.db.entity.Card;

import java.util.List;

public interface CardRepositoryCustom {

    List<Card> searchBySearchCondition(SearchConditionReqDto searchConditionReqDto);

}
