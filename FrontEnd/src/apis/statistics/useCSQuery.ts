import axios from "axios";
import { useQuery } from "react-query";
import { CS_LIST } from "../../constants/queryKeys";
import { CS_URL } from "../../utils/urls";

const fetcher = () => axios.get(CS_URL).then(({ data }) => data.value);

export default function useCSQuery() {
  return useQuery([CS_LIST], fetcher, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {},
    onError: (e) => {},
  });
}
