import { useMutation } from "react-query";
import axios from "axios";
import { LOGOUT_URL } from "../../utils/urls";

const fetcher = () =>
  axios
    .post(LOGOUT_URL, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then(({ data }) => data);

const useLogout = () => {
  return useMutation(fetcher, {
    onSuccess: () => {
      sessionStorage.removeItem("accessToken");
    },
  });
};

export default useLogout;
