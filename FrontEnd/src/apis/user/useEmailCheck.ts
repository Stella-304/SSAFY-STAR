import { useQuery } from "react-query";
import axios from "axios";
import { EMAIL_CHECK_URL } from "../../utils/urls";
import useSendMail from "./useSendMail";

const fetcher = (email: string) =>
  axios
    .get(EMAIL_CHECK_URL, {
      params: { email: email },
    })
    .then(({ data }) => data);

const useEmailCheck = (
  email: string,
  setTimer: (params: any) => void,
  setOpenCheck: (parmas: any) => void,
) => {
  const sendEmailMutate = useSendMail();

  return useQuery(["/emailcheck", email], () => fetcher(email), {
    enabled: false,
    onSuccess: () => {
      //사용가능 이메일
      setTimer(60 * 3); //3분 타이머 시작

      //메일 전송
      sendEmailMutate.mutate({ email: email });
      setOpenCheck(true);
    },
    onError: () => {},
  });
};

export default useEmailCheck;
