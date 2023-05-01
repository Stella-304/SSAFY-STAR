import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/// https://k8b304.p.ssafy.io/app/oauth2/authorization/google?redict_uri=
/// https://k8b304.p.ssafy.io/oauth2/token

/// https://k8b304.p.ssafy.io/app/ << 일단 냅두고
// https://k8b304.p.ssafy.io/oauth2/token?error=&token=asdsacasc
export default function Oauth() {
  const navigate = useNavigate();
  useEffect(() => {
    //쿼리스트링에 param에 있다.
    //세션 스토리지에 저장
    const params = new URLSearchParams(window.location.search);
    let token = params.get("token");
    sessionStorage.setItem("accessToken", token);
    navigate("/");
  }, []);

  return <></>;
}
