import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const navigate = useNavigate();
  useEffect(() => {
    //쿼리스트링에 param에 있다.
    //세션 스토리지에 저장
    const params = new URLSearchParams(window.location.search);
    let token = params.get("param");
    //    sessionStorage.setItem("accessToken", token);
    navigate("/");
  }, []);

  return <></>;
}
