import { useNavigate } from "react-router-dom";
import useLogout from "../../apis/user/useLogout";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useState } from "react";

export default function FloatingMenu() {
  const { email, cardRegistered } = useSelector(
    (state: RootState) => state.user,
  );
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logoutMutate = useLogout();
  const logout = () => {
    logoutMutate.mutate();
  };
  return (
    <div>
      {open ? (
        <div className="fixed bottom-58 right-16 flex h-100 flex-col justify-around border-1 bg-white">
          {email ? (
            <>
              <button onClick={logout}>로그아웃</button>
              <button onClick={() => navigate("/mypage")}>마이페이지</button>
              {cardRegistered ? (
                <button onClick={() => navigate("/cardsubmit/modify")}>
                  카드 수정
                </button>
              ) : (
                <button onClick={() => navigate("/cardsubmit/submit")}>
                  카드 등록
                </button>
              )}
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>로그인</button>
              <button onClick={() => navigate("/signup")}>회원가입</button>
            </>
          )}
          <button onClick={() => navigate("/test3")}>메타버스</button>
        </div>
      ) : (
        <></>
      )}

      <div
        className="fixed bottom-8 right-32 h-50 w-50 rounded-full bg-black text-center leading-50 text-white "
        onClick={() => setOpen(!open)}
      >
        버튼
      </div>
    </div>
  );
}
