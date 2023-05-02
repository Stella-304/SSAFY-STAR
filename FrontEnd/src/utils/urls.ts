const SERVER_API = "https://k8b304.p.ssafy.io";

//로그인
export const LOGIN_URL = SERVER_API + "/app/user/login";
//로그아웃
export const LOGOUT_URL = SERVER_API + "/app/user/logout";

//---------------회원가입
//회원가입
export const SIGNUP_URL = SERVER_API + "/app/user/regist";
//인증메일 전송
export const EMAIL_SEND_URL = SERVER_API + "/app/user/email/send-verification";
//인증메일 확인
export const EMAIL_CODE_CHECK_URL = SERVER_API + "/app/user/email/compare-verification";
//이메일 중복여부
export const EMAIL_CHECK_URL = SERVER_API + "/app/user/email/check-duplicate";

//--------------마이페이지
//비밀번호 초기화 메일 전송
export const FIND_PWD_URL = SERVER_API + "/app/user/email/find-pwd";
//이메일로 아이디 찾기
export const FIND_ID_URL = SERVER_API + "/app/user/email/find-id";
//회사명 검색
export const COMPANY_SEARCH_URL = SERVER_API + "/app/card/company";
//소셜로그인
export const OAUTH_URL = SERVER_API + "/app/oauth2/authorization";
//백준 티어 조회, 업데이트
export const BOJ_URL = SERVER_API + "/app/card/boj";
//뱃지 인증 진행 상태
export const BADGE_STATUS_URL = SERVER_API + "/app/user/badge/status";
//뱃지 인증 요청
export const BADGE_SUBMIT_URL = SERVER_API + "/app/user/badge";
//상세 유저정보 조회
export const USER_DETAIL_URL = SERVER_API + "/app/user/detail";
//메인 유저정보 조회
export const USER_URL = SERVER_API + "/app/user";

//------------------카드
//카드 등록, 수정, 지우기
export const CARD_SUBMIT_URL = SERVER_API + "/app/card";
//카드 목록
export const CARD_LIST_URL = SERVER_API + "/app/card/list";
