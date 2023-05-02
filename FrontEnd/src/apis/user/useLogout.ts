import { useMutation } from "react-query";
import axios from "axios";
import { LOGOUT_URL } from "../../utils/urls";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/user/user";

const fetcher = () =>
  axios
    .post(LOGOUT_URL, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then(({ data }) => data);

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation(fetcher, {
    onSuccess: () => {
      sessionStorage.removeItem("accessToken");
      dispatch(logout());
      navigate("/");
    },
  });
};

export default useLogout;
