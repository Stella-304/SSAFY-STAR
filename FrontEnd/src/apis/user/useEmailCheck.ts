import { useQuery } from "react-query";
import axios from "axios";
import { EMAIL_CHECK_URL } from "../../utils/urls";

const fetcher = (email: string) =>
  axios
    .get(EMAIL_CHECK_URL, {
      params: { email: email },
    })
    .then(({ data }) => data);

const useEmailCheck = (email: string) => {
  return useQuery(["/emailcheck", email], () => fetcher(email), {});
};

export default useEmailCheck;
