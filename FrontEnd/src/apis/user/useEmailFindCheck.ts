import { useQuery } from "react-query";
import { EMAIL_CHECK_URL } from "../../utils/urls";
import useFindId from "../../apis/user/useFindId";
import { api } from "../api";

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
const useEmailFindCheck = (email: string) => {
  const findidQuery = useFindId(email);
  return useQuery(["/emailcheck", email], () => fetcher(email), {
    retry: 0,
    enabled: false,

    onSuccess: () => {
      //등록되지 않은 사용자
      alert("없는 사용자입니다.");
    },
    onError: () => {
      //등록된 사용자
      findidQuery.refetch();
    },
  });
};

export default useEmailFindCheck;
