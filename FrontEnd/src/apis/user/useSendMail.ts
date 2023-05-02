import { useMutation } from "react-query";
import axios from "axios";
import { EMAIL_SEND_URL } from "../../utils/urls";

interface Payload {
  email: string;
}
const fetcher = (payload: Payload) =>
  axios
    .post(
      EMAIL_SEND_URL,
      {},
      {
        params: {
          email: payload.email,
        },
      }
    )
    .then(({ data }) => data);
const useSendMail = () => {
  return useMutation(fetcher, {});
};

export default useSendMail;
