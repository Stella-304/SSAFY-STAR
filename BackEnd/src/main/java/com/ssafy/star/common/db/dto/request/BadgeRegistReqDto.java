package com.ssafy.star.common.db.dto.request;

import com.ssafy.star.common.auth.enumeration.BadgeEnum;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class BadgeRegistReqDto {
	private BadgeEnum badgeType;
}
