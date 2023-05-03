import { useMutation } from "react-query";
import { LOGIN_URL } from "../../utils/urls";
import { LoginType } from "../../types/LoginType";
import useUserCheck from "./useUserCheck";
import { api } from "../api";

const fetcher = (payload: LoginType) =>
  api
    .post(LOGIN_URL, {
      accountId: payload.accountId,
      accountPwd: payload.accountPwd,
    })
    .then(({ data }) => data);
/**
 * 아이디와 비밀번호로 로그인을 진행한다.
 * @returns
 */
const useLogin = () => {
  const usercheck = useUserCheck();
  return useMutation(fetcher, {
    retry: 0,
    onSuccess: (data) => {
      //토큰 저장
      sessionStorage.setItem("accessToken", data.value);
      usercheck.refetch();
    },
    onError: () => {
      alert("아이디, 비밀번호를 확인해 주세요");
    },
  });
};

export default useLogin;
