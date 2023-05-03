import { useNavigate } from "react-router-dom";
import useLogout from "../../apis/user/useLogout";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

export default function FloatingMenu() {
  const { name } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const logoutMutate = useLogout();
  const logout = () => {
    logoutMutate.mutate();
  };
  return (
    <div>
      <div className="fixed bottom-1 right-1 h-100 w-100 rounded-full bg-black text-white">
        버튼
      </div>
      <div className="fixed bottom-1 right-1">
        {name ? (
          <>
            <button onClick={logout}>로그아웃</button>
            <button onClick={() => navigate("/mypage")}>마이페이지</button>
            <button onClick={() => navigate("/cardsubmit")}>카드 등록</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>로그인</button>
            <button onClick={() => navigate("/signup")}>회원가입</button>
          </>
        )}
        <button onClick={() => navigate("/metaverse")}>메타버스</button>
      </div>
    </div>
  );
}
