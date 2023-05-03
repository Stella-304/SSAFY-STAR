import { useQuery } from "react-query";
import { FIND_ID_URL } from "../../utils/urls";
import { api } from "../api";

const fetcher = (email: string) =>
  api
    .get(FIND_ID_URL, {
      params: { email: email },
    })
    .then(({ data }) => data);

/**
 * 이메일로 아이디정보를 전송한다.
 * @param email
 * @returns
 */
const useFindId = (email: string) => {
  return useQuery(["/findid", email], () => fetcher(email), {
    enabled: false,
    retry: 0,
  });
};

export default useFindId;
