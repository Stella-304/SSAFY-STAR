import { useMutation } from "react-query";
import { LOGOUT_URL } from "../../utils/urls";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/user/user";
import { api } from "../api";

const fetcher = () =>
  api
    .post(LOGOUT_URL, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

/**
 * 로그인 한 유저를 로그아웃 한다.
 * 로그아웃성공 - sessionstorage제거, 로그인 정보 제거, 메인으로 이동
 * @returns
 */
const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation(fetcher, {
    retry: 0,
    onSettled: () => {
      //성공, 실패 상관없이 수행
      sessionStorage.removeItem("accessToken"); //토큰제거
      dispatch(logout()); //유저정보 제거
      navigate("/");
    },
  });
};

export default useLogout;
