package com.ssafy.star.common.util.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude
public class ResponseDto {

    private HttpStatus status;
    private String message;
    private Object value;

    public ResponseDto(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public static ResponseDto of(HttpStatus status, String message, Object value) {
        return new ResponseDto(status, message, value);
    }
    public static ResponseDto of(HttpStatus status, String message) {
        return new ResponseDto(status, message);
    }
}
