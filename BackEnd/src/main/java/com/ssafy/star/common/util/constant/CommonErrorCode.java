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
	REQUEST_IN_PROGRESS(HttpStatus.BAD_REQUEST, "해당 뱃지 인증이 이미 진행중입니다."),
	REQUEST_FINISHED(HttpStatus.BAD_REQUEST, "해당 뱃지 인증이 이미 마무리되었습니다.."),

	//이메일 send
	EMAIL_SMTP_ERROR(HttpStatus.SERVICE_UNAVAILABLE, "이메일을 보내지 못했습니다."),

	//소셜인증
	UNAUTHORIZED_URI(HttpStatus.UNAUTHORIZED, "등록되지 않은 Uri입니다."),
	NO_EMAIL_PROVIDED(HttpStatus.UNAUTHORIZED, "이메일을 제공받지 못했습니다."),
	EMAIL_ALREADY_EXITS(HttpStatus.ALREADY_REPORTED, "이미 존재하는 이메일 입니다."),
	BAD_SOCIAL_TYPE(HttpStatus.BAD_REQUEST, "지원하지 않는 소셜 타입입니다."),
	BAD_AUTH_ID(HttpStatus.BAD_REQUEST, "auth_id가 올바르지 않습니다."),

	// 카드
	NO_CARD_PROVIDED(HttpStatus.BAD_REQUEST, "카드를 제공받지 못했습니다."),
	NO_BOJ_ID_PROVIDED(HttpStatus.BAD_REQUEST, "백준 아이디를 제공받지 못했습니다."),
	ALEADY_EXIST_CARD(HttpStatus.BAD_REQUEST, "이미 등록된 카드가 존재합니다."),
	// 코멘트
	NO_COMMENT_PROVIDED(HttpStatus.BAD_REQUEST, "카드 코멘트를 제공받지 못했습니다."),

	//파일
	FILE_NOT_VAILD(HttpStatus.BAD_REQUEST, "유효하지 않은 파일입니다."),

	//로또당첨
	INSANE_USER(HttpStatus.BAD_REQUEST, "로또 당첨자입니다."),

	//파싱
	FAIL_TO_PARSE(HttpStatus.BAD_REQUEST, "파싱에 실패했습니다."),

	//별자리
	FAIL_TO_MAKE_CONSTELLATION(HttpStatus.BAD_REQUEST, "주어진 그룹 조건으로는, 별자리를 만들수 없습니다."),

	// 토큰
	EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다.");

	private final HttpStatus httpStatus;
	private final String message;

}
