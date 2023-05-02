import { useQuery } from "react-query";
import { USER_DETAIL_URL } from "../../utils/urls";
import { sessionApi } from "../api";

const fetcher = () =>
  sessionApi
    .get(USER_DETAIL_URL)
    .then(({ data }) => data);

/**
 * 유저의 정보를 가져온다.
 * @returns 
 */
const useUserDetail = () => {
  return useQuery("/userdetail", fetcher, {});
};

export default useUserDetail;
