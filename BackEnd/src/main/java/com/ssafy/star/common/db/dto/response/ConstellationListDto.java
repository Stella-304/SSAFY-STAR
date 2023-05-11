package com.ssafy.star.common.db.dto.response;

import java.util.List;

import lombok.Getter;

@Getter
public class ConstellationListDto {
	List<CardDetailDto> cardList;
	List<EdgeDto> edgeList;
	List<GroupInfoDto> groupInfoDtoList;
	String filterName;

	public ConstellationListDto(List<CardDetailDto> cardList, List<EdgeDto> edgeList) {
		this.cardList = cardList;
		this.edgeList = edgeList;
	}

	public ConstellationListDto(List<CardDetailDto> cardList, List<EdgeDto> edgeList,
		List<GroupInfoDto> groupInfoDtoList) {
		this(cardList, edgeList);
		this.groupInfoDtoList = groupInfoDtoList;
	}

	public ConstellationListDto(List<CardDetailDto> cardList, List<EdgeDto> edgeList,
		List<GroupInfoDto> groupInfoDtoLis, String filterName) {
		this(cardList, edgeList, groupInfoDtoLis);
		this.filterName = filterName;
	}

}
