package com.ssafy.star.common.db.dto.response;

import com.ssafy.star.common.db.entity.AuthStatus;

import lombok.Getter;

import java.util.Optional;

@Getter
public class BadgeStatusDto {
	String badgeStatus;
	String imageUrl;

	public BadgeStatusDto(String status, String imageUrl) {
		this.badgeStatus = status;
		this.imageUrl = imageUrl;
	}
}
