package com.ssafy.star.common.db.repository.querydsl;

import com.ssafy.star.common.db.dto.request.SearchConditionReqDto;
import com.ssafy.star.common.db.dto.response.CardDetailDto;

import java.util.List;

public interface CardRepositoryCustom {

    List<CardDetailDto> searchBySearchCondition(SearchConditionReqDto searchConditionReqDto);

}
