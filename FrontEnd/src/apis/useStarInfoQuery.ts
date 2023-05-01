import axios from "axios";
import { useQuery } from "react-query";
import { STAR_INFO } from "../constants/queryKeys";

const fetcher = () =>
  axios
    .get("https://k8b304.p.ssafy.io/app/card/list")
    .then(({ data }) => data.value);

export default function useStarInfoQuery() {
  return useQuery(STAR_INFO, () => fetcher(), {
    staleTime: 60 * 5 * 1000,
    cacheTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("별자리 불러오기 성공", data);
    },
  });
}
