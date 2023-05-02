import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

export default function AuthLayout() {
  const { name } = useSelector((state: RootState) => state.user);
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (name !== "") {
      setLoginCheck(true);
    } else {
      // setLoginCheck(true);
      navigate("/login");
    }
  }, []);

  return <>{loginCheck ? <Outlet /> : <></>}</>;
}
