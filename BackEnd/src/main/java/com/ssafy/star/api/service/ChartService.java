package com.ssafy.star.api.service;

import com.ssafy.star.common.db.dto.response.ChartDto;
import com.ssafy.star.common.db.dto.response.CsDto;
import com.ssafy.star.common.db.dto.response.SayingDto;

public interface ChartService {

    ChartDto chartGet(String sort);
    SayingDto sayingGet();
    CsDto csGet();
}
