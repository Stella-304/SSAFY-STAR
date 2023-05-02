import { useQuery } from "react-query";
import { sessionApi } from "../api";
import { BOJ_URL } from "../../utils/urls";

interface Payload {
  bojid: string;
}

const fetcher = (payload: Payload) => 
  sessionApi.get(BOJ_URL + "/" + payload.bojid).then(({ data }) => data);
;

/**
 * 백준 아이디로 백준 티어를 확인한다.
 * @param payload 
 * @returns 
 */
const useBojcheck = (bojid: string) => {
  return useQuery(["/bojcheck", bojid], () => fetcher({ bojid: bojid }), {
    enabled: false,
  });
};

export default useBojcheck;
