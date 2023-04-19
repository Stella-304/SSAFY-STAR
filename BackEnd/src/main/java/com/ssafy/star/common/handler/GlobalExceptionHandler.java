package com.ssafy.star.common.handler;

import com.ssafy.star.common.auth.exception.CustomAuthException;
import com.ssafy.star.common.auth.exception.CustomOAuth2Exception;
import com.ssafy.star.common.exception.CommonApiException;
import com.ssafy.star.common.util.Dto.ErrorResponseDto;
import com.ssafy.star.common.util.constant.ErrorCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.handler.ResponseStatusExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseStatusExceptionHandler {

    @ExceptionHandler(CommonApiException.class)
    public ResponseEntity<Object> handlerCommonApiException(CommonApiException e){
        return handleExceptionInternal(e.getErrorCode());
    }

    @ExceptionHandler(CustomAuthException.class)
    public ResponseEntity<Object> handleCustomAuthException(CustomAuthException e) {
        return handleExceptionInternal(e.getErrorCode());
    }

    @ExceptionHandler(CustomOAuth2Exception.class)
    public ResponseEntity<Object> handleCustomOAuth2Exception(CustomOAuth2Exception e) {
        return handleExceptionInternal(e.getErrorCode());
    }

    private ResponseEntity<Object> handleExceptionInternal(ErrorCode errorCode) {
        return ResponseEntity.status(errorCode.getHttpStatus())
                .body(makeErrorResponse(errorCode));
    }

    private ErrorResponseDto makeErrorResponse(ErrorCode e) {
        return ErrorResponseDto.of(e.name(), e.getMessage());
    }
}


