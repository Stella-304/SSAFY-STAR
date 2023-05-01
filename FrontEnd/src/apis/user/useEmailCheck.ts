import { useMutation } from "react-query";
import axios from "axios";
import { EMAIL_CHECK_URL } from "../../utils/urls";

interface Payload {
  email: string;
}
const fetcher = (payload: Payload) =>
  axios
    .get(EMAIL_CHECK_URL, {
      params: { email: payload.email },
    })
    .then(({ data }) => data);

const useEmailCheck = () => {
  return useMutation(fetcher, {});
};

export default useEmailCheck;
