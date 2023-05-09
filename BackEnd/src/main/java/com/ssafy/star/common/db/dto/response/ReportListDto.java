package com.ssafy.star.common.db.dto.response;

import lombok.Getter;

@Getter
public class ReportListDto {

    String article;

    String content;

    String inProgress;

    ReportListDto(String article, String content, boolean isResolved) {
        this.article = article;
        this.content = content;
        inProgress = isResolved? "처리 중" : "처리 완료";
    }
}
