package com.ssafy.star.common.db.dto.response;

import com.ssafy.star.common.db.entity.Card;

public class CardDetailDto {

	long cardId;
	double x;
	double y;
	double z;
	int generation;
	String campus;
	int ban;

	String githubId;
	String bojId;
	String bojTier;
	String blogAddr;
	String company;
	String track;
	String email;
	String nickname;
	boolean isAutorized;

	public CardDetailDto(Card card, double x, double y, double z){
		this.cardId = card.getId();
		this.x = x;
		card.getUser().getEmail();
	}
}
