import { useQuery } from "react-query";
import { api } from "../api";
import { BOJ_URL } from "../../utils/urls";
import { isExpire } from "../error/isExpire";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/stores/user/user";

const fetcher = () =>
  api
    .post(
      BOJ_URL,
      {},
      {
        headers: { Authorization: sessionStorage.getItem("accessToken") },
      },
    )
    .then(({ data }) => data);

/**
 * 백준 티어를 업데이트 한다.
 * @returns
 */
const useBojcheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useQuery("/bojupdate", fetcher, {
    enabled: false,
    retry: 0,
    onError: (e: any) => {
      if (isExpire(e.response.status)) {
        alert("다시 로그인 해주세요");
        dispatch(logout());
        navigate("/");
        return;
      }
      if (e.response.status === 400) {
        alert("백준아이디를 등록해주세요.");
        return;
      }
      alert("잠시후에 시도해주세요");
    },
  });
};

export default useBojcheck;
