import { useQuery } from "react-query";
import axios from "axios";
import { FIND_ID_URL } from "../../utils/urls";

const fetcher = (email: string) =>
  axios
    .get(FIND_ID_URL, {
      params: { email: email },
    })
    .then(({ data }) => data);

const useFindId = (email: string) => {
  return useQuery(["/findid", email], () => fetcher(email), { enabled: false });
};

export default useFindId;
