/**
 * 403코드는 토큰 만료 코드로 로그아웃 진행 후, 메인으로 이동시킨다.
 * @param code
 */
export const isExpire = (code: any) => {
  return code === 403;
};
