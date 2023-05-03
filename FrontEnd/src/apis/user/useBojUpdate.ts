import { useQuery } from "react-query";
import { api } from "../api";
import { BOJ_URL } from "../../utils/urls";

const fetcher = () =>
  api
    .get(BOJ_URL, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

/**
 * 백준 티어를 업데이트 한다.
 * @returns
 */
const useBojcheck = () => {
  return useQuery("/bojupdate", fetcher, {
    enabled: false,
    retry: 0,
    onError: (e: any) => {
      if (e.response.status === 403) {
        alert("카드에서 백준아이디를 등록해주세요.");
      }else{
        alert("잠시후에 시도해주세요")
      }
    },
  });
};

export default useBojcheck;
