import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { logout } from "../../stores/user/user";
import useUserRole from "../../apis/user/useRole";

export default function AdminLayout() {
  const { email } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [adminCheck, setAdminCheck] = useState(false);
  const userRoleQuery = useUserRole(setAdminCheck);
  const navigate = useNavigate();
  useEffect(() => {
    if (email !== "") {
      //이름이 있음
      if (!sessionStorage.getItem("accessToken")) {
        //세션이 없음
        dispatch(logout());
        navigate("/");
      } else {
        //세션 있음
        //어드민 권한을 확인한다.
        userRoleQuery.refetch();
      }
    } else {
      //로그인안됨
      navigate("/");
    }
  }, []);

  return <>{adminCheck ? <Outlet /> : <></>}</>;
}
