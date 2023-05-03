package com.ssafy.star.common.db.dto.response;

import java.util.List;

import lombok.Getter;

@Getter
public class ConstellationListDto {
	List<CardDetailDto> cardList;
	List<EdgeDto> edgeList;

	public ConstellationListDto(List<CardDetailDto> cardList, List<EdgeDto> edgeList) {
		this.cardList = cardList;
		this.edgeList = edgeList;
	}
}
