import { useQuery } from "react-query";
import axios from "axios";
import { USER_URL } from "../../utils/urls";

const fetcher = () =>
  axios
    .get(USER_URL, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then(({ data }) => data);

const useUserCheck = () => {
  return useQuery("/usercheck", fetcher, {
    onSuccess: (data) => {
      console.log(data.value);
    },
    onError: () => {},
  });
};

export default useUserCheck;
