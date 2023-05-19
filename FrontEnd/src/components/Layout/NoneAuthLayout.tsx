import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { logout } from "../../stores/user/user";

/**
 * 로그인을 안한 유저만 거른다.
 * @returns
 */
export default function NoneAuthLayout() {
  const { email } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (email !== "" && sessionStorage.getItem("accessToken")) {
      //둘다 있으면 로그인한 유저
      navigate("/");
    } else {
      dispatch(logout()); //유저정보 초기화
      setLoginCheck(true);
    }
  }, []);

  return <>{loginCheck ? <Outlet /> : <></>}</>;
}
