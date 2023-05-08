import { useNavigate } from "react-router-dom";
import useLogout from "../../apis/user/useLogout";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useEffect, useState } from "react";
import FloatButton from "../Button/FloatButton";

export default function FloatingMenu() {
  const { email, cardRegistered } = useSelector(
    (state: RootState) => state.user,
  );
  const { path } = useSelector((state: RootState) => state.path);
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
    <>
      <div className="fixed left-0 top-0 flex w-full justify-between gap-8 bg-black font-['nemo030']">
        <div
          className="cursor-pointer select-none text-center font-['RocaOne'] text-4xl text-[#02C7FE]"
          onClick={() => navigate("/")}
        >
          SSAFY-STAR
        </div>
        <div className="flex justify-end gap-8">
          <FloatButton
            onClick={() => navigate("/universe")}
            value="유니버스"
            path={path === "universe"}
          />
          <FloatButton
            onClick={() => navigate("/metaverse")}
            value="메타버스"
            path={path === "metaverse"}
          />
          {email ? (
            <>
              <FloatButton onClick={logout} value="로그아웃" path={false} />
              <FloatButton
                onClick={() => navigate("/mypage")}
                value="마이페이지"
                path={path === "mypage"}
              />
              {cardRegistered ? (
                <FloatButton
                  onClick={() => navigate("/cardsubmit/modify")}
                  value="카드 수정"
                  path={path === "cardmodify"}
                />
              ) : (
                <FloatButton
                  onClick={() => navigate("/cardsubmit/submit")}
                  value="카드 등록"
                  path={path === "cardsubmit"}
                />
              )}
            </>
          ) : (
            <>
              <FloatButton
                onClick={() => navigate("/login")}
                value="로그인"
                path={path === "login"}
              />
              <FloatButton
                onClick={() => navigate("/signup")}
                value="회원가입"
                path={path === "signup"}
              />
            </>
          )}
        </div>
      </div>
      <button className="fixed bottom-16 right-16 h-40" onClick={addChannel}>
        <img
          className="h-40"
          src="/kakao/channel_add_small_3X.png"
          alt="카카오플러스친구"
        />
      </button>
    </>
  );
}
