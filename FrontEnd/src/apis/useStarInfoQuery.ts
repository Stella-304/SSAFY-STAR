import { useQuery } from "react-query";
import { STAR_INFO } from "../constants/queryKeys";
import { STAR_INFO_URL } from "../utils/urls";
import { api } from "./api";

const fetcher = () =>
  api
    .get(STAR_INFO_URL, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data.value);

export default function useStarInfoQuery() {
  return useQuery(STAR_INFO, () => fetcher(), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("전체 별자리 불러오기 성공!", data);
    },
    onError: (e) => {
      console.log("전체 별자리 불러오기 실패!", e);
    },
  });
}
