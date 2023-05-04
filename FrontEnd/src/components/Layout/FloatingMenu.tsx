import { useNavigate } from "react-router-dom";
import useLogout from "../../apis/user/useLogout";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useEffect, useState } from "react";
import FloatButton from "../Button/FloatButton";

declare global {
  interface Window {
    Kakao: any;
  }
  const Kakao: any;
}
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

  useEffect(() => {
    // 에러 처리
    try {
      if (Kakao) {
        window.Kakao.init(process.env.REACT_APP_KAKAP_API);
      }
    } catch (e) {}
  }, []);
  function addChannel() {
    Kakao.Channel.addChannel({
      channelPublicId: "_xgZYxkxj",
    });
  }
  return (
    <div>
      {open ? (
        <div className="fixed bottom-58 right-16 flex flex-col justify-around gap-8">
          {email ? (
            <>
              <FloatButton onClick={logout} value="로그아웃" />
              <FloatButton
                onClick={() => navigate("/mypage")}
                value="마이페이지"
              />
              {cardRegistered ? (
                <FloatButton
                  onClick={() => navigate("/cardsubmit/modify")}
                  value="카드 수정"
                />
              ) : (
                <FloatButton
                  onClick={() => navigate("/cardsubmit/submit")}
                  value="카드 등록"
                />
              )}
            </>
          ) : (
            <>
              <FloatButton onClick={() => navigate("/login")} value="로그인" />
              <FloatButton
                onClick={() => navigate("/signup")}
                value="회원가입"
              />
            </>
          )}
          <FloatButton onClick={() => navigate("/test3")} value="메타버스" />
          <button className="h-40" onClick={addChannel}>
            <img
              className="h-40"
              src="./kakao/channel_add_small_3X.png"
              alt="카카오플러스친구"
            />
          </button>
        </div>
      ) : (
        <></>
      )}

      <div
        className="fixed bottom-8 right-32 h-50 w-50 rounded-full bg-black text-center leading-50 text-white "
        onClick={() => setOpen(!open)}
      >
        메뉴
      </div>
    </div>
  );
}
