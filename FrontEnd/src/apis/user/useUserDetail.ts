import { useQuery } from "react-query";
import { USER_DETAIL_URL } from "../../utils/urls";
import { api } from "../api";

const fetcher = () =>
  api
    .get(USER_DETAIL_URL,{headers:{Authorization:sessionStorage.getItem("accessToken")}})
    .then(({ data }) => data);

/**
 * 유저의 정보를 가져온다.
 * @returns 
 */
const useUserDetail = () => {
  return useQuery("/userdetail", fetcher, {});
};

export default useUserDetail;
