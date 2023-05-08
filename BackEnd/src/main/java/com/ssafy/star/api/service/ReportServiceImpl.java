package com.ssafy.star.api.service;

import com.ssafy.star.common.auth.enumeration.ReportEnum;
import com.ssafy.star.common.db.dto.request.ReportReqDto;
import com.ssafy.star.common.db.entity.Report;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.ReportRepository;
import com.ssafy.star.common.provider.AuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{

    private final ReportRepository repository;
    private final AuthProvider authProvider;

    @Override
    public List<String> articleReport() {
        return ReportEnum.getAllValues();
    }

    @Override
    public void sendReport(ReportReqDto reportReqDto) {
        repository.save(Report.builder()
                .user(User.builder().id(authProvider.getUserIdFromPrincipal()).build())
                .article(reportReqDto.getArticle())
                .content(reportReqDto.getContent())
                .build());
    }
}
