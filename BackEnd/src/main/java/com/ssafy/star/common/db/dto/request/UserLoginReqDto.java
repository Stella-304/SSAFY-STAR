package com.ssafy.star.common.db.dto.request;


import lombok.Getter;

@Getter
public class UserLoginReqDto {

    private String email;
    private String accountPwd;
}
