import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { logout } from "../../stores/user/user";
import useUserRole from "../../apis/user/useRole";

/**
 * 관리자 권한이 있는 사람을 거른다.
 * @returns
 */
export default function AdminLayout() {
  const { email } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [adminCheck, setAdminCheck] = useState(false);
  const userRoleQuery = useUserRole(setAdminCheck);
  const navigate = useNavigate();
  useEffect(() => {
    if (email !== "" && sessionStorage.getItem("accessToken")) {
      //어드민 권한을 확인한다.
      userRoleQuery.refetch();
    } else {
      dispatch(logout());
      navigate("/login");
    }
  }, []);

  return <>{adminCheck ? <Outlet /> : <></>}</>;
}
