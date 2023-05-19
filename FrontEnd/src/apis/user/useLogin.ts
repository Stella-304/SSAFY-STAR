import { useMutation } from "react-query";
import { LOGIN_URL } from "../../utils/urls";
import { LoginType } from "../../types/LoginType";
// import useUserCheck from "./useUserCheck";
import useUserDetail from "./useUserDetail";
import { api } from "../api";

const fetcher = (payload: LoginType) =>
  api
    .post(LOGIN_URL, {
      email: payload.email,
      accountPwd: payload.accountPwd,
    })
    .then(({ data }) => data);
/**
 * 아이디와 비밀번호로 로그인을 진행한다.
 * @returns
 */
const useLogin = () => {
  const usercheck = useUserDetail();
  return useMutation(fetcher, {
    retry: 0,
    onSuccess: (data) => {
      //토큰 저장
      sessionStorage.setItem("accessToken", data.value);
      usercheck.refetch();
    },
    onError: (e: any) => {
      if (e.response.status === 404) {
        alert("아이디나 비밀번호를 확인해주세요");
      } else {
        alert("잠시후 시도해 주세요.");
      }
    },
  });
};

export default useLogin;
