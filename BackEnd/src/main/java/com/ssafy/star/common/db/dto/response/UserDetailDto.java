package com.ssafy.star.common.db.dto.response;


public class UserDetailDto {

    String name;

    String email;

    boolean isAuthorized;

    public UserDetailDto(String name, String email, boolean isAuthorized) {
        this.name = name;
        this.email = email;
        this.isAuthorized = isAuthorized;
    }
}
