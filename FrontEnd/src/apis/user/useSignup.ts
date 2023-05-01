import { useMutation } from "react-query";
import axios from "axios";
import { SIGNUP_URL } from "../../utils/urls";

interface Payload {
  email: string;
  nickname: string;
  userId: string;
  userPwd: string;
}
const fetcher = (payload: Payload) =>
  axios
    .post(SIGNUP_URL, {
      email: payload.email,
      nickname: payload.nickname,
      userId: payload.userId,
      userPwd: payload.userPwd,
    })
    .then(({ data }) => data);

const useSignup = () => {
  return useMutation(fetcher, {});
};

export default useSignup;
