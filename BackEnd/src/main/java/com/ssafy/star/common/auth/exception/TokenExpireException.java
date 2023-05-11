package com.ssafy.star.common.auth.exception;

import com.ssafy.star.common.util.constant.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@RequiredArgsConstructor
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class TokenExpireException extends RuntimeException {

    private final ErrorCode errorCode;
}
