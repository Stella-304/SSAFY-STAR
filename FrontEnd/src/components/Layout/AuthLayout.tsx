import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { logout } from "../../stores/user/user";

export default function AuthLayout() {
  const { email } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (email !== "") {
      if (!sessionStorage.getItem("accessToken")) {
        dispatch(logout());
        navigate("/login");
      } else {
        setLoginCheck(true);
      }
    } else {
      // setLoginCheck(true);
      navigate("/login");
    }
  }, []);

  return <>{loginCheck ? <Outlet /> : <></>}</>;
}
