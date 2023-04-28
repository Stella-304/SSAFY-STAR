package com.ssafy.star.common.db.dto.request;

import lombok.Getter;

@Getter
public class UserRegistDto {

    String email;

    String nickname;

    String userId;
    String userPwd;
}
