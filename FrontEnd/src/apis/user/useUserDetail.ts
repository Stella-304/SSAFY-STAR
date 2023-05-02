import { useQuery } from "react-query";
import axios from "axios";
import { USER_DETAIL_URL } from "../../utils/urls";

const fetcher = () =>
  axios
    .get(USER_DETAIL_URL, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then(({ data }) => data);

const useUserDetail = () => {
  return useQuery("/userdetail", fetcher, {});
};

export default useUserDetail;
