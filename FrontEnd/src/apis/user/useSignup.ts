import { useMutation } from "react-query";
import { SIGNUP_URL } from "../../utils/urls";
import { SignupType } from "../../types/SignupType";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

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
 * 회원가입을 진행한다.
 * 성공시 메인으로
 * 실패시 알림
 * @returns 
 */
const useSignup = () => {
  const navigate = useNavigate();
  return useMutation(fetcher, {
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      alert("잠시후 시도해 주세요");
    },
  });
};

export default useSignup;
