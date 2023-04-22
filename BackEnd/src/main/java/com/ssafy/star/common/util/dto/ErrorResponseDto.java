package com.ssafy.star.common.util.dto;

import lombok.*;

@Getter
@RequiredArgsConstructor
public class ErrorResponseDto {

    private final String code;
    private final String message;

    public static ErrorResponseDto of(String code, String message){
        return new ErrorResponseDto(code, message);
    }
}
