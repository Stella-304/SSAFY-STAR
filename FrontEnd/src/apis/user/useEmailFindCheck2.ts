import { useQuery } from "react-query";
import { EMAIL_CHECK_URL } from "../../utils/urls";
import { api } from "../api";
import useFindPwd from "./useFindPwd";

const fetcher = (email: string) =>
  api
    .get(EMAIL_CHECK_URL, {
      params: { email: email },
    })
    .then(({ data }) => data);

/**
 * 이메일을 입력하고, 중복인지(등록된 이메일인지) 확인해준다.
 * @param email 이메일
 * @param setTimer 인증번호 대기 시간
 * @param setOpenCheck 인증창 열기
 * @returns
 */
const useEmailFindCheck = (email: string, accountId: string) => {
  const findMutate = useFindPwd();
  return useQuery(["/emailcheck", email], () => fetcher(email), {
    enabled: false,
    retry: 0,
    onSuccess: () => {
      alert("없는 사용자입니다.");
    },
    onError: () => {
      findMutate.mutate({ email: email, accountId: accountId });
    },
  });
};

export default useEmailFindCheck;
