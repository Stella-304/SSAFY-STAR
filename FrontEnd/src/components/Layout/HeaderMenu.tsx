import { useNavigate } from "react-router-dom";
import useLogout from "../../apis/user/useLogout";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useEffect, useState } from "react";
import HeaderButton from "../Button/HeaderButton";
import kakaoPlusFriend from "../../assets/icons/channel_add_small_3X.png";
import SmallButton from "../Button/SmallButton";
import Report from "@/pages/Report";
import { SERVER_API } from "@/utils/urls";
import FloatButton from "../Button/FloatButton";

export default function HeaderMenu() {
  const { nickname, email, cardRegistered } = useSelector(
    (state: RootState) => state.user,
  );
  const [reportOpen, setReportOpen] = useState(false);
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
      <div className="fixed left-0 top-0 flex h-50 w-full min-w-880 items-center justify-between gap-8 bg-black font-neob">
        <div
          className="flex flex-row gap-10 justify-center ml-16 h-44 cursor-pointer mt-13 select-none text-center font-gothic text-2xl leading-38 text-[#ffffff] hover:text-[#2f81f7]"
          onClick={() => navigate("/")}
        >
          <div>
          <img src="/icons/logo.png" className="h-35"></img>

          </div>
          <div className="flex justify-center items-center mb-13">
            SSAFY-STAR
          </div>
        </div>
        <div className="flex justify-end gap-8">
          <HeaderButton
            onClick={() => navigate("/universe")}
            value="유니버스"
            path={path === "universe"}
          />
          <HeaderButton
            onClick={() => window.open(`${SERVER_API}/metaverse`)}
            value="메타버스"
            path={path === "metaverse"}
          />
          <HeaderButton
            onClick={() => navigate("/statistics")}
            value="싸피통계"
            path={path === "statistics"}
          />
          {email ? (
            <>
              <HeaderButton
                onClick={() => navigate("/certify")}
                value="인증하기"
                path={path === "certify"}
              />
              {cardRegistered ? (
                <HeaderButton
                  onClick={() => navigate("/cardsubmit/modify")}
                  value="카드 수정"
                  path={path === "cardmodify"}
                />
              ) : (
                <HeaderButton
                  onClick={() => navigate("/cardsubmit/submit")}
                  value="카드 등록"
                  path={path === "cardsubmit"}
                />
              )}
              <HeaderButton
                onClick={() => navigate("/mypage")}
                value="마이페이지"
                path={path === "mypage"}
              />
              <HeaderButton onClick={logout} value="로그아웃" path={false} />
            </>
          ) : (
            <>
              <HeaderButton
                onClick={() => navigate("/login")}
                value="로그인"
                path={path === "login"}
              />
              <HeaderButton
                onClick={() => navigate("/signup")}
                value="회원가입"
                path={path === "signup"}
              />
            </>
          )}
        </div>
      </div>
      <button className="fixed bottom-66 right-16 h-40 hover:opacity-90">
        <FloatButton
          path={false}
          value="📢신고"
          onClick={() => setReportOpen(true)}
        />
      </button>
      <button
        className="fixed bottom-16 right-16 h-40 hover:opacity-90"
        onClick={addChannel}
      >
        <FloatButton path={false} value="카카오+" onClick={() => {}} />
      </button>
      <Report open={reportOpen} onClose={() => setReportOpen(false)} />
    </>
  );
}
