package com.ssafy.star.common.db.dto.request;

import lombok.Getter;

@Getter
public class UserRegistReqDto {

    String email;

    String nickname;

    String userId;
    String userPwd;
}
