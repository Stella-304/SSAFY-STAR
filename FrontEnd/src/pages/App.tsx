import FloatingMenu from "../components/Layout/FloatingMenu";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import useUserNum from "../apis/main/useUserNumber";

function App() {
  const navigate = useNavigate();

  const [allSsafyCount, setallSsafyCount] = useState("");
  const [useSiteSsafyCount, setuseSiteSsafyCount] = useState("");
  const [useSiteAllCount, setuseSiteAllCount] = useState("");
  //react query
  const userNumCheckquery = useUserNum();

  //api호출
  //백준티어 가져오기
  useMemo(() => {
    if (userNumCheckquery.isLoading || userNumCheckquery.error) return null;
    console.log(allSsafyCount);
    console.log(userNumCheckquery.data);
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

  const MainPage = () => {
    return (
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_stars_background.png')] bg-cover bg-local bg-center bg-no-repeat">
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
          <div className="-mt-50 flex justify-center">
            <button className=" mx-50 rounded-[10px] border border-[#02C7FE] bg-transparent px-70 py-15 font-['nemo030'] text-white hover:border-transparent hover:bg-[#02C7FE] hover:text-white">
              더 알아보기
            </button>
            <button
              onClick={() => navigate("/test1")}
              className=" rounded-[10px] bg-[#02C7FE] px-70 py-15 font-['nemo030'] text-white hover:bg-blue-100 hover:text-black"
            >
              바로 시작하기
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <MainPage />
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_temp_2.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_temp_3.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_temp_4.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_temp_5.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="flex h-screen w-screen items-center justify-start bg-[url('/public/background/landing_temp_6.png')] bg-cover bg-center bg-no-repeat">
      </div>
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_temp_7.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_temp_8.png')] bg-cover bg-center bg-no-repeat"></div>
      <FloatingMenu />
    </div>
  );
}
export default App;
