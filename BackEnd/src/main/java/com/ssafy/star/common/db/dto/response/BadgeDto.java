package com.ssafy.star.common.db.dto.response;

import java.util.Optional;

import com.ssafy.star.common.db.entity.AuthStatus;
import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.User;

import lombok.Getter;

@Getter
public class BadgeDto {
	String badgeType;
	String imageUrl;
	boolean processStatus;
	String userName;
	String companyName;

	public BadgeDto(AuthStatus authStatus) {
		this.badgeType = authStatus.getBadgeType().toString();
		this.imageUrl = authStatus.getImageUrl();
		this.processStatus = authStatus.isProcessStatus();
		this.userName = authStatus.getUser().getName();
		Optional.ofNullable(authStatus.getUser().getCard()).ifPresentOrElse(x -> {
			this.companyName = Optional.ofNullable(x.getCompany()).orElse("회사를 등록하지 않았습니다.");
		}, () -> {
			this.companyName = "카드를 등록하지 않았습니다.";
		});

	}
}
