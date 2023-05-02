import { useNavigate } from "react-router-dom";
import useLogout from "../../apis/user/useLogout";

export default function FloatingMenu() {
  const navigate = useNavigate();
  const logoutMutate = useLogout();
  const logout = () => {
    logoutMutate.mutate();
  };
  return (
    <div className="fixed bottom-1 right-1">
      <button onClick={() => navigate("/login")}>로그인</button>
      <button onClick={() => navigate("/signup")}>회원가입</button>
      <button onClick={() => navigate("/metaverse")}>메타버스</button>
      <button onClick={logout}>로그아웃</button>
      <button onClick={() => navigate("/mypage")}>마이페이지</button>
      <button onClick={() => navigate("/cardsubmit")}>카드 등록</button>
    </div>
  );
}
