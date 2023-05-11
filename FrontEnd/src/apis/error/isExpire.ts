import { logout } from "@/stores/user/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * 401코드는 토큰 만료 코드로 로그아웃 진행 후, 메인으로 이동시킨다.
 * @param code
 */
export const isExpire = (code: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (code === 401) {
    alert("다시 로그인 해주세요");
    dispatch(logout());
    navigate("/");
    return true;
  }
  return false;
};
