package com.ssafy.star.common.db.dto.response;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.star.common.db.entity.AuthStatus;
import com.ssafy.star.common.db.entity.Card;

import lombok.Getter;

@Getter
public class BadgeListDto {

	List<BadgeDto> badgeDtoList;

	public BadgeListDto(List<AuthStatus> authStatusList) {
		this.badgeDtoList = authStatusList.stream().map(BadgeDto::new).sorted(new Comparator<BadgeDto>() {
			@Override
			public int compare(BadgeDto bd1, BadgeDto bd2) {

				boolean b1 = bd1.isProcessStatus();
				boolean b2 = bd2.isProcessStatus();

				if (b1 == !b2) {
					return 1;
				}
				if (!b1 == b2) {
					return -1;
				}
				return 0;
			}
		}).collect(Collectors.toList());
	}
}
