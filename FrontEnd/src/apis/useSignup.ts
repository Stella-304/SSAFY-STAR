import { useMutation } from "react-query";
import axios from "axios";
import { LOGIN_URL } from "../utils/urls";

interface Payload {
  email: string;
  password: number;
}
const fetcher = (payload: Payload) =>
  axios
    .post(LOGIN_URL, {
      memberId: payload.email,
      notificationId: payload.password,
    })
    .then(({ data }) => data);

const useLogin = () => {
  return useMutation(fetcher, {});
};

export default useLogin;
