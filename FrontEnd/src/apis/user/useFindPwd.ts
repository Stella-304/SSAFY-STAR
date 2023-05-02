import { useMutation } from "react-query";
import { FIND_PWD_URL } from "../../utils/urls";
import { api } from "../api";

interface Payload {
  email: string;
  accountId: string;
}
const fetcher = (payload: Payload) =>
  api
    .post(FIND_PWD_URL, {
      accountId: payload.accountId,
      email: payload.email,
    })
    .then(({ data }) => data);


/**
 * 이메일과 아이디를 입력후 이메일로 초기화 비밀번호를 전달한다.
 * @returns 
 */
const useFindPwd = () => {
  return useMutation(fetcher, {});
};

export default useFindPwd;
