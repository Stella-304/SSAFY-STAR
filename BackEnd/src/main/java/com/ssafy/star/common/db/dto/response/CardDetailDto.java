package com.ssafy.star.common.db.dto.response;

import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.Coordinate;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Column;

@Getter
@ToString
public class CardDetailDto {

	long cardId;
	double x;
	double y;
	double z;
	String generation;
	String campus;
	String ban;
	String content;
	String githubId;
	String bojId;
	String bojTier;
	String blogAddr;
	String company;
	String track;
	String email;
	String nickname;
	String name;
	String major;
	String swTier;
	String etc;
	String role;
	boolean isAuthorized;
	boolean companyIsAuthorized;
	boolean isMine;

	public CardDetailDto(Card card, double x, double y, double z, boolean isMine) {
		// System.out.println(card.getUser());
		this.cardId = card.getId();
		this.x = x;
		this.y = y;
		this.z = z;
		this.generation = card.getGeneration();
		this.campus = card.getCampus();
		this.ban = card.getBan();
		this.githubId = card.getGithubId();
		this.bojId = card.getBojId();
		this.bojTier = card.getBojTier();
		this.blogAddr = card.getBlogAddr();
		this.company = card.getCompany();
		this.track = card.getTrack();
		this.major = card.getMajor();
		this.swTier = card.getSwTier();
		this.role = card.getRole();
		this.content = card.getContent();
		this.etc = card.getEtc();
		this.email = card.getUser().getEmail();
		this.nickname = card.getUser().getNickname();
		this.name = card.getUser().getName();
		this.isAuthorized = card.getUser().isAuthorized();
		this.companyIsAuthorized = card.getUser().isCompanyIsAuthorized();
		this.isMine = isMine;
	}
}
