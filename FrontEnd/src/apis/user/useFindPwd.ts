import { useMutation } from "react-query";
import axios from "axios";
import { FIND_PWD_URL } from "../../utils/urls";

interface Payload {
  email: string;
  accountId: string;
}
const fetcher = (payload: Payload) =>
  axios
    .post(FIND_PWD_URL, {
      accountId: payload.accountId,
      email: payload.email,
    })
    .then(({ data }) => data);

const useFindPwd = () => {
  return useMutation(fetcher, {});
};

export default useFindPwd;
