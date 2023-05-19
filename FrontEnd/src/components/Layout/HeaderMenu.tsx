import { useNavigate } from "react-router-dom";
import useLogout from "../../apis/user/useLogout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useEffect, useState } from "react";
import HeaderButton from "../Button/HeaderButton";
import Report from "@/pages/Report";
import { SERVER_API } from "@/utils/urls";
import FloatButton from "../Button/FloatButton";
import { setPath } from "@/stores/page/path";

export default function HeaderMenu() {
  const { nickname, email, cardRegistered } = useSelector(
    (state: RootState) => state.user,
  );
  const [reportOpen, setReportOpen] = useState(false);
  const [isLogIn, setIsLogin] = useState<boolean>(false);
  const { path } = useSelector((state: RootState) => state.path);
  const dispatch = useDispatch();
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

    dispatch(setPath("statistics"));
    return () => {
      setPath("");
    };
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
      <div className="fixed left-0 top-0 flex h-50 w-full min-w-880 items-center justify-between gap-8 bg-black font-neob">
        <div
          className="ml-16 mt-13 flex h-44 cursor-pointer select-none flex-row justify-center gap-10 text-center font-gothic text-2xl leading-38 text-[#ffffff] hover:text-[#2f81f7]"
          onClick={() => navigate("/")}
        >
          <div>
            <img src="/icons/logo.png" className="h-35"></img>
          </div>
          <div className="mb-13 flex items-center justify-center">
            SSAFY-STAR
          </div>
        </div>
        <div className="flex justify-end gap-8">
          <HeaderButton
            onClick={
              isLogIn ? () => navigate("/universe") : () => navigate("/login")
            }
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
          {isLogIn ? (
            <>
              <HeaderButton
                onClick={() => navigate("/certify")}
                value="인증하기"
                path={path === "certify"}
              />
              {cardRegistered ? (
                <HeaderButton
                  onClick={() => navigate("/cardsubmit/modify")}
                  value="별 수정"
                  path={path === "cardmodify"}
                />
              ) : (
                <HeaderButton
                  onClick={() => navigate("/cardsubmit/submit")}
                  value="별 등록"
                  path={path === "cardsubmit"}
                />
              )}
              <HeaderButton
                onClick={() => navigate("/mypage")}
                value="마이페이지"
                path={path === "mypage"}
              />
              <HeaderButton
                onClick={() => {
                  logout();
                  setIsLogin(false);
                }}
                value="로그아웃"
                path={false}
              />
            </>
          ) : (
            <>
              <HeaderButton
                onClick={() => navigate("/login")}
                value="로그인"
                path={path === "login"}
              />
            </>
          )}
        </div>
      </div>
      <div className="fixed bottom-66 right-16 z-10 h-40 hover:opacity-90">
        <FloatButton path={false} value="📢신고" onClick={openReport} />
      </div>
      <div
        className="fixed bottom-16 right-16 z-10 h-40 hover:opacity-90"
        onClick={addChannel}
      >
        <FloatButton path={false} value="카카오+" onClick={() => {}} />
      </div>
      {reportOpen && (
        <Report open={reportOpen} onClose={() => setReportOpen(false)} />
      )}
    </>
  );
}
