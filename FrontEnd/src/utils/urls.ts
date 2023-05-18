export const SERVER_API = "https://ssafy-star.com";

//로그인
export const LOGIN_URL = SERVER_API + "/app/user/login";
//소셜로그인
export const OAUTH_URL = SERVER_API + "/app/oauth2/authorization";
export const OAUTH_REDIRECT_URL = SERVER_API + "/oauth2/token";
//로그아웃
export const LOGOUT_URL = SERVER_API + "/app/user/logout";

//---------------회원가입
//회원가입
export const SIGNUP_URL = SERVER_API + "/app/user/regist";
//인증메일 전송
export const EMAIL_SEND_URL = SERVER_API + "/app/user/email/send-verification";
//인증메일 확인
export const EMAIL_CODE_CHECK_URL =
  SERVER_API + "/app/user/email/compare-verification";
//이메일 중복여부
export const EMAIL_CHECK_URL = SERVER_API + "/app/user/email/check-duplicate";

//--------------마이페이지
//비밀번호 초기화 메일 전송
export const FIND_PWD_URL = SERVER_API + "/app/user/email/find-pwd";
//이메일로 아이디 찾기
export const FIND_ID_URL = SERVER_API + "/app/user/email/find-id";
//회사명 검색
export const COMPANY_SEARCH_URL = SERVER_API + "/app/card/company";
//백준 티어 조회, 업데이트
export const BOJ_URL = SERVER_API + "/app/card/boj";
//뱃지 인증 진행 상태
export const BADGE_STATUS_URL = SERVER_API + "/app/user/badge/status";
//뱃지 인증 요청
export const BADGE_SUBMIT_URL = SERVER_API + "/app/user/badge";
//상세 유저정보 조회
export const USER_DETAIL_URL = SERVER_API + "/app/user/detail";
//메인 유저정보 조회, 정보수정
export const USER_URL = SERVER_API + "/app/user";
//비밀번호 수정
export const USER_PWD_MODY_URL = SERVER_API + "/app/user/pwd";
//유저의 권한조회
export const ROLE_URL = SERVER_API + "/app/user/role";

//------------------카드
//카드 등록, 수정
export const CARD_SUBMIT_URL = SERVER_API + "/app/card";
//카드 목록
export const CARD_LIST_URL = SERVER_API + "/app/card/list";
//백준티어확인
export const BOJ_CHECK_URL = SERVER_API + "/app/card/boj";
//나의 카드 조회, 삭제
export const CARD_MYCARD_URL = SERVER_API + "/app/card/mycard";

// 별(유저)정보 확인
export const STAR_INFO_URL = SERVER_API + "/app/card/list";

// 별(유저)정보 필터링 확인
export const STAR_FILTER_INFO_URL = SERVER_API + "/app/card/list-v1";
export const STAR_FILTER_INFO_URL2 = SERVER_API + "/app/card/list-v2";

//---------------메인 메이지
// 유저 숫자 조회
export const MAIN_USERNUM_URL = SERVER_API + "/app/number/landing";

//--- 관리자
export const ADMIN_ALL = SERVER_API + "/app/admin/badge/list/all";
export const ADMIN_YET = SERVER_API + "/app/admin/badge/list/yet";
//관리자 승인
export const ADMIN_ACCEPT = SERVER_API + "/app/admin/badge";
//관리자 신고 내역
export const ADMIN_REPORT = SERVER_API + "/app/admin/report/all";

// 카드 코멘트 API
export const COMMENT_URL = SERVER_API + "/app/comment";

// 카드 코멘트 답글 API
export const REPLY_URL = SERVER_API + "/app/comment/reply";

//신고
export const REPORT_URL = SERVER_API + "/app/report";

//차트
export const CHART_URL = SERVER_API + "/app/chart";

//명언
export const SAYING_URL = SERVER_API + "/app/chart/saying";

//CS
export const CS_URL = SERVER_API + "/app/chart/cs";
