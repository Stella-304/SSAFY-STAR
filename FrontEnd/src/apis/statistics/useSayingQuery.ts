import axios from "axios";
import { useQuery } from "react-query";
import { SAYING_LIST } from "../../constants/queryKeys";
import { SAYING_URL } from "../../utils/urls";

const fetcher = () => axios.get(SAYING_URL).then(({ data }) => data.value);

export default function useSayingQuery() {
  return useQuery([SAYING_LIST], fetcher, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("명언 불러오기 성공", data);
    },
    onError: (e) => {
      console.log("명언 불러오기 실패", e);
    },
  });
}
