import { useEffect } from "react";
import useUserCheck from "../../apis/user/useUserCheck";

/// https://k8b304.p.ssafy.io/app/oauth2/authorization/google?redict_uri=
/// https://k8b304.p.ssafy.io/oauth2/token

/// https://k8b304.p.ssafy.io/app/ << 일단 냅두고
// https://k8b304.p.ssafy.io/oauth2/token?error=&token=asdsacasc
export default function Oauth() {
  const usercheck = useUserCheck();
  const params = new URLSearchParams(window.location.search);
  let token = params.get("token");

  useEffect(() => {
    sessionStorage.setItem("accessToken", token);
    usercheck.refetch();
  }, []);

  return <></>;
}
