package com.ssafy.star.common.db.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GroupInfoDto {
	double x;
	double y;
	double z;
	String groupName;
}
