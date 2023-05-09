package com.ssafy.star.common.db.dto.request;

import lombok.Getter;

@Getter
public class EmailCompareReqDto {

    private String email;
    private String userCode;
}
