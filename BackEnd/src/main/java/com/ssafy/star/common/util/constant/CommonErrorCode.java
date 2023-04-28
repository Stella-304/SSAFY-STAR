package com.ssafy.star.common.util.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;

/*
 * error throwing시 포함 될 error enum 상수가 포함되는 클래스
 * @Author 이상학
 */
@Getter
@RequiredArgsConstructor
public enum CommonErrorCode implements ErrorCode {

	//유저
	USER_ID_NOT_FOUND(HttpStatus.FORBIDDEN, "존재하지 않는 아이디입니다."),
	USER_EMAIL_NOT_FOUND(HttpStatus.FORBIDDEN, "존재하지 않는 이메일 입니다."),
	USER_NOT_FOUND(HttpStatus.FORBIDDEN, "존재하지 않는 유저입니다."),
	UNLOGINED_USER(HttpStatus.FORBIDDEN, "로그인 되지 않은 유저입니다."),

	//소셜인증
	UNAUTHORIZED_URI(HttpStatus.UNAUTHORIZED, "등록되지 않은 Uri입니다."),
	NO_EMAIL_PROVIDED(HttpStatus.UNAUTHORIZED, "이메일을 제공받지 못했습니다."),
	EMAIL_ALREADY_EXITS(HttpStatus.ALREADY_REPORTED, "이미 존재하는 이메일 입니다."),
	BAD_SOCIAL_TYPE(HttpStatus.BAD_REQUEST, "지원하지 않는 소셜 타입입니다."),

	// 카드
	NO_CARD_PROVIDED(HttpStatus.FORBIDDEN, "카드를 제공받지 못했습니다."),
	NO_BOJ_ID_PROVIDED(HttpStatus.FORBIDDEN, "백준 아이디를 제공받지 못했습니다."),
	ALEADY_EXIST_CARD(HttpStatus.FORBIDDEN,"이미 등록된 카드가 존재합니다."),

	//파일
	FILE_NOT_VAILD(HttpStatus.FORBIDDEN, "유효하지 않은 파일입니다")
	;

	private final HttpStatus httpStatus;
	private final String message;

}
