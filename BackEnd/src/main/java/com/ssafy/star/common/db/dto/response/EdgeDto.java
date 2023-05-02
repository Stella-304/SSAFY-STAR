package com.ssafy.star.common.db.dto.response;

import com.ssafy.star.common.db.entity.Card;

import lombok.Getter;

@Getter
public class EdgeDto {
	double x1;
	double y1;
	double z1;
	double x2;
	double y2;
	double z2;

	public EdgeDto(CardDetailDto card1, CardDetailDto card2) {
		this.x1 = card1.getX();
		this.y1 = card1.getY();
		this.z1 = card1.getZ();
		this.x2 = card2.getX();
		this.y2 = card2.getY();
		this.z2 = card2.getZ();
	}
}
