import { useQuery } from "react-query";
import { USER_URL } from "../../utils/urls";
import { useNavigate } from "react-router-dom";
import { setName } from "../../stores/user/user";
import { useDispatch } from "react-redux";
import { api } from "../api";

const fetcher = () =>
  api
    .get(USER_URL, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

/**
 * 로그인한 유저인지 확인한다.
 * 로그인한 경우 redux에 정보저장, 메인으로 이동
 * 로그인 안한 경우 login페이지로 이동
 * @returns
 */
const useUserCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useQuery("/usercheck", fetcher, {
    enabled: false,
    retry: 0,
    onSuccess: (data) => {
      dispatch(setName(data.value));
      navigate("/");
    },
    onError: () => {
      alert("토큰이 확인이 안됩니다.");
      navigate("/login");
    },
  });
};

export default useUserCheck;
