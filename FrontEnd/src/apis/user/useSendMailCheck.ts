import { useMutation } from "react-query";
import { EMAIL_CODE_CHECK_URL } from "../../utils/urls";
import { api } from "../api";

interface Payload {
  email: string;
  code: string;
}
const fetcher = (payload: Payload) =>
  api
    .post(EMAIL_CODE_CHECK_URL, {
      email: payload.email,
      userCode: payload.code,
    })
    .then(({ data }) => data);

/**
 * 이메일로 보낸 인증코드의 일치여부를 확인한다.
 * 인증성공시 인증시간종료, 인증완료설정
 * @param param0
 * @returns
 */
const useSendMailCheck = ({
  setTimer, //인증코드 시간 설정
  setCodeWarning, //인증코드 오류 메시지 설정
  setCodeConfirm, //인증코드 확인 메시지 설정
  setEmailCheck, //인증 유무 설정
}: {
  setTimer: (params: any) => void;
  setCodeWarning: (params: string) => void;
  setCodeConfirm: (params: string) => void;
  setEmailCheck: (params: any) => void;
}) => {
  return useMutation(fetcher, {
    retry: 0,
    onSuccess: () => {
      setTimer(-1);
      setCodeWarning("");
      setCodeConfirm("인증완료");
      setEmailCheck(true);
    },
    onError: (e: any) => {
      if (e.response.status === 404) {
        alert("인증번호가 일치하지 않습니다.");
      }
    },
  });
};

export default useSendMailCheck;
