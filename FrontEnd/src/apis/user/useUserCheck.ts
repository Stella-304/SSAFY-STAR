import { useQuery } from "react-query";
import { USER_URL } from "../../utils/urls";
import { useNavigate } from "react-router-dom";
import { logout, setUser } from "../../stores/user/user";
import { useDispatch } from "react-redux";
import { api } from "../api";
import { isExpire } from "../error/isExpire";

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
      dispatch(setUser({ name: data.value }));
      navigate("/");
    },
    onError: (e: any) => {
      if (isExpire(e.response.status)) {
        alert("다시 로그인 해주세요");
        dispatch(logout());
        navigate("/");
        return;
      }
      alert("잠시후 다시 시도해 주세요.");
    },
  });
};

export default useUserCheck;
