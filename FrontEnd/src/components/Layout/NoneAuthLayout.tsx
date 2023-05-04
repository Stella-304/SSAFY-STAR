import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { logout } from "../../stores/user/user";

export default function NoneAuthLayout() {
  const { email } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    //로그인 안하면 true
    //로그인 하면 false
    if (email !== "") {
      //로그인함
      if (sessionStorage.getItem("accessToken") !== null) {
        navigate("/"); //진짜 로그인하면 메인으로
      } else {
        alert(sessionStorage.getItem("accessToken"));
        //세션이 없다? 로그아웃 진행
        dispatch(logout());
        setLoginCheck(true);
      }
    } else {
      //로그인 안함
      setLoginCheck(true);
    }
  }, []);

  return <>{loginCheck ? <Outlet /> : <></>}</>;
}
