import { useMutation } from "react-query";
import { api } from "../api";
import { REPORT_URL } from "../../utils/urls";
import { isExpire } from "../error/isExpire";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/stores/user/user";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation(fetcher, {
    retry: 0,
    onSuccess: () => {
      alert("신고가 완료되었습니다.");
    },
    onError: (e: any) => {
      if (isExpire(e.response.status)) {
        alert("다시 로그인 해주세요");
        dispatch(logout());
        navigate("/");
        return;
      }
      alert("로그인후 이용해 주세요");
    },
  });
};

export default useReport;
