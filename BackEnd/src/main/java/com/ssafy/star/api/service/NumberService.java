package com.ssafy.star.api.service;

import com.ssafy.star.common.db.dto.response.LandingNumberDto;
import com.ssafy.star.common.db.dto.response.MainNumberDto;

public interface NumberService {
	LandingNumberDto getLandingNumber();

    MainNumberDto getMainNumber();
}
