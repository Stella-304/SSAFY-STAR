import { useMutation } from "react-query";
import { api } from "../api";
import { REPORT_URL } from "../../utils/urls";

const fetcher = (payload: { article: string; content: string }) =>
  api
    .post(
      REPORT_URL,
      { article: payload.article, content: payload.content },
      {
        headers: { Authorization: sessionStorage.getItem("accessToken") },
      },
    )
    .then(({ data }) => data);

const useReport = () => {
  return useMutation(fetcher, {
    retry: 0,
    onSuccess: () => {
      alert("신고가 완료되었습니다.");
    },
    onError: () => {
      alert("로그인후 이용해 주세요");
    },
  });
};

export default useReport;
