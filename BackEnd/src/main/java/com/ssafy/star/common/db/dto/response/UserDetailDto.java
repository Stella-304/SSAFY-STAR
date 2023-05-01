package com.ssafy.star.common.db.dto.response;


public class UserDetailDto {

    String name;

    String email;

    boolean isAuthorized;

    public UserDetailDto(String name, String email, boolean isAuthorized) {

        this.name = name.equals("익명") ? "이름을 입력하세요." : name;
        this.email = email;
        this.isAuthorized = isAuthorized;
    }
}
