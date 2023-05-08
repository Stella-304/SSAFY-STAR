import { useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import useUserNum from "../apis/main/useUserNumber";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "../stores/page/path";
import { RootState } from "../stores/store";
import HeaderMenu from "../components/Layout/HeaderMenu";

export default function MainPage() {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

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
    <div>
      <div className="h-screen w-full items-center bg-[url('/public/background/landing_stars_background.png')] bg-cover bg-local bg-center bg-no-repeat">
        <div className="flex h-screen  flex-col justify-around">
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
          <div className="mt-20 select-none text-center font-['RocaOne'] text-9xl text-[#02C7FE]">
            SSAFY-STAR
          </div>
          <div className="-mt-80">
            <div className="select-none text-center font-['nemo030'] text-3xl text-white">
              전체 싸피생 : {allSsafyCount}
            </div>
            <div className="mt-10 select-none text-center font-['nemo030'] text-3xl text-white">
              현재 사용자 : {useSiteAllCount}
            </div>
            <div className="mt-10 select-none text-center font-['nemo030'] text-3xl text-white">
              인증된 사용자 : {useSiteSsafyCount}
            </div>
          </div>
          <div className="-mt-50 flex justify-center gap-50">
            <button
              onClick={() => navigate("/metaverse")}
              className="rounded-[10px] border border-[#02C7FE] bg-transparent px-70 py-15 font-['nemo030'] text-white hover:border-transparent hover:bg-[#02C7FE] hover:text-white"
            >
              메타버스
            </button>
            <button
              onClick={() => navigate("/universe")}
              className=" rounded-[10px] bg-[#02C7FE] px-70 py-15 font-['nemo030'] text-white hover:bg-blue-100 hover:text-black"
            >
              별 보러가기
            </button>
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
