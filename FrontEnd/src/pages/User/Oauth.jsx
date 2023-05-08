import { useEffect } from "react";
import useUserDetail from "../../apis/user/useUserDetail";
import { useNavigate } from "react-router-dom";
// import useUserCheck from "../../apis/user/useUserCheck";

/// https://k8b304.p.ssafy.io/app/oauth2/authorization/google?redict_uri=
/// https://k8b304.p.ssafy.io/oauth2/token

/// https://k8b304.p.ssafy.io/app/ << 일단 냅두고
// https://k8b304.p.ssafy.io/oauth2/token?error=&token=asdsacasc
export default function Oauth() {
  const navigate = useNavigate();
  const usercheck = useUserDetail();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const error = params.get("error");

  useEffect(() => {
    if (error === "") {
      sessionStorage.setItem("accessToken", token);
      usercheck.refetch();
    } else {
      alert(error);
      navigate("/");
    }
  }, []);

  return <></>;
}
