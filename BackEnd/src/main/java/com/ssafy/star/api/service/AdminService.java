package com.ssafy.star.api.service;

import java.util.List;

import com.ssafy.star.common.db.dto.request.CardRegistReqDto;
import com.ssafy.star.common.db.dto.request.CardUpdateReqDto;
import com.ssafy.star.common.db.dto.request.SearchConditionReqDto;
import com.ssafy.star.common.db.dto.response.BadgeListDto;
import com.ssafy.star.common.db.dto.response.ConstellationListDto;

public interface AdminService {
	BadgeListDto getBadgeList(String type);

	void registBadge(long auth_id, String type);
}
