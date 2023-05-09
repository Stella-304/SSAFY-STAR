package com.ssafy.star.api.service;


import com.ssafy.star.common.db.dto.request.ReportReqDto;
import com.ssafy.star.common.db.entity.Report;

import java.util.List;

public interface ReportService {

    List<String> articleReport();

    void sendReport(ReportReqDto reportReqDto);

}
