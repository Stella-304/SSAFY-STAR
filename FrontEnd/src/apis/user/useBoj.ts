import { useQuery } from "react-query";
import { api } from "../api";
import { BOJ_URL } from "../../utils/urls";
import { isExpire } from "../error/isExpire";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/stores/user/user";

interface Payload {
  bojid: string;
}

const fetcher = (payload: Payload) =>
  api
    .get(BOJ_URL + "/" + payload.bojid, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);
/**
 * 백준 아이디로 백준 티어를 확인한다.
 * @param payload
 * @returns
 */
const useBojcheck = (bojid: string, setBojTier: (params: string) => void) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useQuery(["/bojcheck", bojid], () => fetcher({ bojid: bojid }), {
    enabled: false,
    retry: 0,
    onSuccess: (data) => {
      setBojTier(data.value);
    },
    onError: (e: any) => {
      if (isExpire(e.response.status)) {
        alert("다시 로그인 해주세요");
        dispatch(logout());
        navigate("/");
        return;
      }
      alert("잠시후에 시도해주세요");
    },
  });
};

export default useBojcheck;
