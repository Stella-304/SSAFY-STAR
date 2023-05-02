// 8글자 16글자 사이, 알파벳 대소문자, 숫자
//!', '@', '?', '#'
//무조건 하나씩 포함
export const passwordReg =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#?])(?=\S{8,16}$).*/g;

//이메일 형식,문자@문자.문자
export const emailReg = /[\w\-\.]+@[\w]+\.[\w]+/g;

//아이디 형식 영문대소, 숫자 10글자 이내
export const loginidReg = /^[a-zA-Z0-9]{0,10}$/g;

//숫자만
export const isNumber = /^\d+$/g;