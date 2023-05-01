package com.ssafy.star.common.db.dto.request;

import lombok.Getter;

@Getter
public class UserRegistReqDto {

    String email;

    String name;

    String nickname;

    String accountId;

    String accountPwd;
}
