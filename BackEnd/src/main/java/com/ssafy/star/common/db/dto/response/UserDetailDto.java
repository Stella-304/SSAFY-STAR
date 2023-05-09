package com.ssafy.star.common.db.dto.response;


import lombok.Getter;

@Getter
public class UserDetailDto {

    String name;
    String nickname;
    String email;
    boolean isAuthorized;
    boolean isCardRegistered;

    public UserDetailDto(String name,String nickname, String email, boolean isAuthorized,boolean isCardRegistered) {

        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.isAuthorized = isAuthorized;
        this.isCardRegistered = isCardRegistered;
    }
}
