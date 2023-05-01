import { useMutation } from "react-query";
import axios from "axios";
import { SIGNUP_URL } from "../../utils/urls";
import { SignupType } from "../../types/SignupType";
import { useNavigate } from "react-router-dom";

const fetcher = (payload: SignupType) =>
  axios
    .post(SIGNUP_URL, {
      email: payload.email,
      name:payload.name,
      nickname: payload.nickname,
      accountId: payload.userId,
      accountPwd: payload.userPwd,
    })
    .then(({ data }) => data);

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
