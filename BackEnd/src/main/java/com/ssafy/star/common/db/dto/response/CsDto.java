package com.ssafy.star.common.db.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class CsDto {

    List<String[]> cs;

    public CsDto(List<String[]> cs) {
        this.cs = cs;
    }
}
