package com.ssafy.star.api.service;

import com.ssafy.star.common.db.dto.response.ChartDto;

public interface ChartService {

    ChartDto chartGet(String sort);
}
