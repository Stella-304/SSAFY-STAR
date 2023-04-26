package com.ssafy.star.common.db.dto.response;

import lombok.Getter;

@Getter
public class EdgeDto {
	long cardId1;
	long cardId2;

	public EdgeDto(long cardId1, long cardId2) {
		this.cardId1 = cardId1;
		this.cardId2 = cardId2;
	}
}
