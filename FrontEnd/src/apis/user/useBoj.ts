import { useQuery } from "react-query";
import axios from "axios";
import { BOJ_URL } from "../../utils/urls";

interface Payload {
  bojid: string;
}
const fetcher = (payload: Payload) => {
  if (payload.bojid !== "")
    return axios.get(BOJ_URL + "/" + payload.bojid).then(({ data }) => data);
};

const useBojcheck = (bojid: string) => {
  return useQuery(["/bojcheck", bojid], () => fetcher({ bojid: bojid }), {});
};

export default useBojcheck;
