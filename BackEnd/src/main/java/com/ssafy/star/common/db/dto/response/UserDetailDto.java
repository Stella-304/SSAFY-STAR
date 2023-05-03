package com.ssafy.star.common.db.dto.response;


import lombok.Getter;

@Getter
public class UserDetailDto {

    String name;

    String email;

    boolean isAuthorized;

    boolean isCardRegistered;

    public UserDetailDto(String name, String email, boolean isAuthorized,boolean isCardRegistered) {

        this.name = name.equals("익명") ? "이름을 입력하세요." : name;
        this.email = email;
        this.isAuthorized = isAuthorized;
        this.isCardRegistered = isCardRegistered;
    }
}
