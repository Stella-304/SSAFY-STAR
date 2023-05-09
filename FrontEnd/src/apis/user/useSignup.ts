import { useMutation } from "react-query";
import { SIGNUP_URL } from "../../utils/urls";
import { SignupType } from "../../types/SignupType";
import { api } from "../api";
import useLogin from "./useLogin";
import { LoginType } from "../../types/LoginType";
const fetcher = (payload: SignupType) =>
  api
    .post(SIGNUP_URL, {
      email: payload.email,
      accountPwd: payload.userPwd,
    })
    .then(({ data }) => data);

/**
 *  회원가입을 진행한다.
 * 성공시 메인으로
 * 실패시 알림
 * @param email
 * @param accountPwd
 * @param setIdWarning
 * @returns
 */
const useSignup = (email: string, accountPwd: string) => {
  const loginMutate = useLogin();
  return useMutation(fetcher, {
    retry: 0,
    onSuccess: () => {
      //로그인 진행
      const payload: LoginType = {
        email: email,
        accountPwd: accountPwd,
      };
      loginMutate.mutate(payload);
    },
    onError: () => {
      alert("잠시후 다시 시도해 주세요.");
    },
  });
};

export default useSignup;
