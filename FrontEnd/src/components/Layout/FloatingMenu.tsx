import { useNavigate } from "react-router-dom";
import useLogout from "../../apis/user/useLogout";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useEffect, useState } from "react";
import FloatButton from "../Button/FloatButton";
import kakaoPlusFriend from "../../assets/icons/channel_add_small_3X.png";
import { SERVER_API } from "@/utils/urls";
import Report from "@/pages/Report";

export default function FloatingMenu() {
  const { email, cardRegistered } = useSelector(
    (state: RootState) => state.user,
  );
  const { path } = useSelector((state: RootState) => state.path);
  const [open, setOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [isLogIn, setIsLogin] = useState<boolean>(false);

  const navigate = useNavigate();
  const logoutMutate = useLogout();
  const logout = () => {
    logoutMutate.mutate();
  };

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

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
  const openReport = () => {
    if (!email) {
      alert("로그인후 이용해주세요");
      return;
    }
    setReportOpen(true);
  };
  return (
    <>
      {open ? (
        <div className="fixed bottom-78 right-16 flex flex-col justify-around gap-8 font-['nemo030']">
          <FloatButton
            onClick={() => navigate("/")}
            path={path === "home"}
            value="홈으로"
          />
          {isLogIn ? (
            <>
              <FloatButton
                onClick={() => {
                  logout();
                  setIsLogin(false);
                }}
                value="로그아웃"
                path={false}
              />
              <FloatButton
                onClick={() => navigate("/mypage")}
                value="마이페이지"
                path={path === "mypage"}
              />
              <FloatButton
                onClick={() => navigate("/certify")}
                value="인증하기"
                path={path === "certify"}
              />
              {cardRegistered ? (
                <FloatButton
                  onClick={() => navigate("/cardsubmit/modify")}
                  value="별 수정"
                  path={path === "cardmodify"}
                />
              ) : (
                <FloatButton
                  onClick={() => navigate("/cardsubmit/submit")}
                  value="별 등록"
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
            </>
          )}
          <FloatButton
            onClick={() => navigate("/universe")}
            value="유니버스"
            path={path === "universe"}
          />
          <FloatButton
            onClick={() => window.open(`${SERVER_API}/metaverse`)}
            value="메타버스"
            path={path === "metaverse"}
          />
          <FloatButton
            onClick={() => navigate("/statistics")}
            value="싸피통계"
            path={path === "statistics"}
          />
          <FloatButton path={false} value="📢신고" onClick={openReport} />
          <FloatButton path={false} value="카카오+" onClick={addChannel} />
        </div>
      ) : (
        <></>
      )}

      <div
        className="fixed bottom-18 right-18 h-50 w-50 cursor-pointer rounded-full border-2 border-white bg-black text-center font-semibold leading-50 text-white hover:bg-white hover:text-black"
        onClick={() => setOpen(!open)}
      >
        메뉴
      </div>
      {reportOpen ? (
        <Report open={reportOpen} onClose={() => setReportOpen(false)} />
      ) : (
        <></>
      )}
    </>
  );
}
