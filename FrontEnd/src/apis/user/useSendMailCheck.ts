import { useMutation } from "react-query";
import axios from "axios";
import { EMAIL_CODE_CHECK_URL } from "../../utils/urls";

interface Payload {
  email:string;
  code: string;
}
const fetcher = (payload: Payload) =>
  axios
    .post(EMAIL_CODE_CHECK_URL, {
      email: payload.email,
      userCode: payload.code,
    })
    .then(({ data }) => data);
const useSendMailCheck = ({
  setTimer,
  setCodeWarning,
  setCodeConfirm,
  setEmailCheck,
}: {
  setTimer: (params: any) => void;
  setCodeWarning: (params: string) => void;
  setCodeConfirm: (params: string) => void;
  setEmailCheck: (params: any) => void;
}) => {
  return useMutation(fetcher, {
    onSuccess: () => {
      setTimer(-1);
      setCodeWarning("");
      setCodeConfirm("인증완료");
      setEmailCheck(true);
    },
    onError: () => {},
  });
};

export default useSendMailCheck;
