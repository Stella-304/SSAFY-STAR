import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { logout } from "../../stores/user/user";

/**
 * 로그인한 유저를 거른다.
 * - redux에 값 & sessionstroage에 값
 * @returns
 */
export default function AuthLayout() {
  const { email } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (email !== "" && sessionStorage.getItem("accessToken")) {
      setLoginCheck(true);
    } else {
      dispatch(logout());
      navigate("/login");
    }
    // setLoginCheck(true);
  }, []);

  return <>{loginCheck ? <Outlet /> : <></>}</>;
}
