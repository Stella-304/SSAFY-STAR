package com.ssafy.star.common.db.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class ReportReqDto {

    private String article;

    private String content;
}
