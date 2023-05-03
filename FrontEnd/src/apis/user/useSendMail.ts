import { useMutation } from "react-query";
import { EMAIL_SEND_URL } from "../../utils/urls";
import { api } from "../api";

interface Payload {
  email: string;
}
const fetcher = (payload: Payload) =>
  api
    .post(
      EMAIL_SEND_URL,
      {},
      {
        params: {
          email: payload.email,
        },
      },
    )
    .then(({ data }) => data);

/**
 * 인증 이메일을 전송한다.
 * @returns
 */
const useSendMail = () => {
  return useMutation(fetcher, { retry: 0 });
};

export default useSendMail;
