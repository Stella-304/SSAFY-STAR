import { useQuery } from "react-query";
import axios from "axios";
import { USER_URL } from "../../utils/urls";
import { useNavigate } from "react-router-dom";
import { setName } from "../../stores/user/user";
import { useDispatch } from "react-redux";

const fetcher = () =>
  axios
    .get(USER_URL, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then(({ data }) => data);

const useUserCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useQuery("/usercheck", fetcher, {
    enabled: false,
    onSuccess: (data) => {
      dispatch(setName(data.value));
    },
    onError: () => {
      navigate("/login");
    },
  });
};

export default useUserCheck;
