package com.ssafy.star.common.db.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class SayingDto {

    List<String[]> saying;

    public SayingDto(List<String[]> saying) {
        this.saying = saying;
    }
}
