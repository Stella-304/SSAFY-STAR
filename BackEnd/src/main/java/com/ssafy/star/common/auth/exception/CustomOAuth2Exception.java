package com.ssafy.star.common.auth.exception;

import com.ssafy.star.common.util.constant.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CustomOAuth2Exception extends RuntimeException{
    private final ErrorCode errorCode;
}
