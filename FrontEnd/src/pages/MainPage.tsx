import { useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import useUserNum from "../apis/main/useUserNumber";
import { useDispatch } from "react-redux";
import { setPath } from "../stores/page/path";
import HeaderMenu from "../components/Layout/HeaderMenu";
import { SERVER_API } from "@/utils/urls";

export default function MainPage() {
  const navigate = useNavigate();

  const [allSsafyCount, setallSsafyCount] = useState("");
  const [useSiteSsafyCount, setuseSiteSsafyCount] = useState("");
  const [useSiteAllCount, setuseSiteAllCount] = useState("");

  const dispatch = useDispatch();

  //react query
  const userNumCheckquery = useUserNum();

  //api호출
  //백준티어 가져오기
  useMemo(() => {
    if (userNumCheckquery.isLoading || userNumCheckquery.error) return null;
    if (userNumCheckquery.data !== undefined) {
      setallSsafyCount(userNumCheckquery.data.value.allSsafyCount);
      setuseSiteSsafyCount(userNumCheckquery.data.value.useSiteSsafyCount);
      setuseSiteAllCount(userNumCheckquery.data.value.useSiteAllCount);
    }
  }, [
    userNumCheckquery.isLoading,
    userNumCheckquery.error,
    userNumCheckquery.data,
  ]);
  useEffect(() => {
    dispatch(setPath("home"));
    return () => {
      dispatch(setPath(""));
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-x-hidden overflow-y-scroll  scrollbar-thin scrollbar-track-black scrollbar-thumb-white">
      <div className="h-full w-full items-center bg-[url('/public/background/main_background.png')] bg-cover bg-local bg-center bg-no-repeat">
        <div className="flex h-screen flex-col items-center justify-around">
          <div>
            <img
              className=" mx-auto h-auto max-w-xs select-none font-bold"
              src="/background/landing_starLogo.png"
              alt="logo"
            ></img>
            <div className="text-1xl select-none text-center text-white">
              STELLA
            </div>
          </div>
          <div className="mt-20 select-none text-center font-neo text-9xl text-white">
            SSAFY-STAR
          </div>
          <div className="-mt-80">
            <div className="select-none overflow-hidden whitespace-nowrap text-center font-['nemo030'] text-3xl text-white">
              전체 싸피생 : {allSsafyCount}
            </div>
            <div className="mt-10 select-none text-center font-['nemo030'] text-3xl text-white">
              현재 사용자 : {useSiteAllCount}
            </div>
            <div className="mt-10 select-none text-center font-['nemo030'] text-3xl text-white">
              인증된 사용자 : {useSiteSsafyCount}
            </div>
          </div>
          <div className="relative -mt-50 flex h-54 w-600 justify-center">
            <div className="group cursor-pointer">
              <button
                onClick={() => window.open(`${SERVER_API}/metaverse`)}
                className=" mx-50 rounded-[10px] border border-blue2 bg-black px-70 py-15 font-['nemo030'] text-white hover:border-transparent hover:bg-blue2 hover:text-white"
              >
                메타버스
              </button>
              <div className="invisible absolute -left-250 -top-130 h-121 w-400 rounded-10 border-1 border-white bg-black p-22 pb-100 font-['nemo030'] text-16 text-white group-hover:visible">
                싸피 교육생들간 소통할 수 있는 메타버스 공간입니다.
                <br /> 선배NPC와 싸피 프로젝트 홍보관을 만나보세요!
                <br /> 로그인 없이 GUEST로도 이용가능합니다.
              </div>
            </div>

            <div className="group cursor-pointer">
              <button
                onClick={() => navigate("/universe")}
                className="rounded-[10px] bg-blue2 px-70 py-15 font-['nemo030'] text-white hover:bg-blue2 hover:text-black"
              >
                별 보러가기
              </button>
              <div className="invisible absolute -right-220 -top-130 h-121 w-320 rounded-10 border-1 border-white bg-black p-22 pb-100 font-['nemo030'] text-16 text-white group-hover:visible">
                싸피 교육생들의 응원의 한 마디, 정보를
                <br /> 별자리의 형태로 볼 수 있는 공간 입니다. <br />
                로그인 후 이용할 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-full items-center bg-[url('/public/background/landing_temp_2.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-full items-center bg-[url('/public/background/landing_temp_3.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-full items-center bg-[url('/public/background/landing_temp_4.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-full items-center bg-[url('/public/background/landing_temp_5.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="flex h-screen w-full items-center justify-start bg-[url('/public/background/landing_temp_6.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-full items-center bg-[url('/public/background/landing_temp_7.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-full items-center bg-[url('/public/background/landing_temp_8.png')] bg-cover bg-center bg-no-repeat"></div>
      <HeaderMenu />
    </div>
  );
}
