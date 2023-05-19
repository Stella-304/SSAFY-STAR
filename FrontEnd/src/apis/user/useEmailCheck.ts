import { useQuery } from "react-query";
import { EMAIL_CHECK_URL } from "../../utils/urls";
import useSendMail from "./useSendMail";
import { api } from "../api";

const fetcher = (email: string) =>
  api
    .get(EMAIL_CHECK_URL, {
      params: { email: email },
    })
    .then(({ data }) => data);

/**
 * 이메일을 입력하고, 중복을 확인한다.
 * 사용가능한 이메일시 - 이메일로 인증번호가 전송
 * @param email 이메일
 * @param setTimer 인증번호 대기 시간
 * @param setOpenCheck 인증창 열기
 * @returns
 */
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
      setOpenCheck(true); //인증창 열기
      setTimer(60 * 3); //3분 타이머 시작

      //인증 메일 전송
      sendEmailMutate.mutate({ email: email });
    },
    onError: (e: any) => {
      if (e.response.status === 409) {
        alert("이메일이 중복되었습니다.");
      } else {
        alert("잠시후 시도해 주세요.");
      }
      setTimer(-1);
      setOpenCheck(false);
    },
    retry: 0,
  });
};

export default useEmailCheck;
