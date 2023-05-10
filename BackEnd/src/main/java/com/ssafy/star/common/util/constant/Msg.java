package com.ssafy.star.common.util.constant;


/*
* "Controller 에서" 프론트엔드에 반환할 ResponseDto에 사용될 메세지 상수를 기술하는 클래스
* CRUD 이외의 상태 반환이 필요할 시 추가 기술
* Detail/List Get 경우 모두 Get으로 통일
* @Author 이상학
*/
public interface Msg {
    //CRUD
    final String SUCCESS_GET = "조회에 성공했습니다.";
    final String SUCCESS_REGIST = "등록에 성공했습니다.";
    final String SUCCESS_DELETE = "삭제에 성공했습니다.";
    final String SUCCESS_UPDATE = "수정에 성공했습니다.";

    final String FAULURE_GET = "조회에 실패했습니다.";

    //ETC
    final String SUCCESS_LOGIN = "로그인에 성공했습니다.";
    final String FAULURE_LOGIN = "로그인에 실패했습니다.";
    final String SUCCESS_LOGOUT = "로그아웃에 성공했습니다.";

    final String SUCCESS_EMAIL_AUTH = "이메일 인증에 성공했습니다.";
    final String DIFFERENT_AUTH_CODE = "인증코드가 다릅니다.";
    final String EMAIL_NOT_FOUND = "등록되지 않은 이메일 입니다.";
    final String DUPLICATED_NICKNAME = "중복된 닉네임입니다.";
    final String DUPLICATED_EMAIL = "중복된 이메일입니다.";
    final String VALID_EMAIL = "사용 가능한 이메일입니다.";
    final String VALID_NICKNAME = "사용 가능한 닉네임입니다.";
    final String SUCCESS_SEND_EMAIL = "이메일 전송에 성공했습니다.";
}

