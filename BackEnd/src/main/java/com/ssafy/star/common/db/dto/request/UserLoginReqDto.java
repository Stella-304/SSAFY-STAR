package com.ssafy.star.common.db.dto.request;


import lombok.Getter;

@Getter
public class UserLoginReqDto {

    private String accountId;
    private String accountPwd;
}
