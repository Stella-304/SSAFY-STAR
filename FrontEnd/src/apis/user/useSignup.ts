import { useMutation } from "react-query";
import { SIGNUP_URL } from "../../utils/urls";
import { SignupType } from "../../types/SignupType";
import { api } from "../api";
import useLogin from "./useLogin";

const fetcher = (payload: SignupType) =>
  api
    .post(SIGNUP_URL, {
      email: payload.email,
      name: payload.name,
      nickname: payload.nickname,
      accountId: payload.userId,
      accountPwd: payload.userPwd,
    })
    .then(({ data }) => data);

/**
 *  회원가입을 진행한다.
 * 성공시 메인으로
 * 실패시 알림
 * @param accountId
 * @param accountPwd
 * @param setIdWarning
 * @returns
 */
const useSignup = (
  accountId: string,
  accountPwd: string,
  setIdWarning: (params: string) => void,
) => {
  const loginMutate = useLogin();
  return useMutation(fetcher, {
    retry: 0,
    onSuccess: () => {
      //로그인 진행
      loginMutate.mutate({
        accountId: accountId,
        accountPwd: accountPwd,
      });
    },
    onError: (e: any) => {
      if (e.response.status === 409) {
        alert("존재하는 아이디입니다.");
        setIdWarning("존재하는 아이디입니다.");
      }
    },
  });
};

export default useSignup;
