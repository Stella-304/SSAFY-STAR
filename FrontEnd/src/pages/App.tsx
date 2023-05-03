import { useNavigate } from "react-router-dom";
import FloatingMenu from "../components/Layout/FloatingMenu";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_stars_background.png')] bg-cover bg-local bg-center bg-no-repeat">
        <div className="flex h-screen  flex-col justify-around">
          <div>
            <img
              className=" mx-auto h-auto max-w-xs font-bold"
              src="/background/landing_starLogo.png"
              alt="logo"
            ></img>
            <div className="text-1xl text-center text-white">STELLA</div>
          </div>
          <div className="mt-20 text-center font-['RocaOne'] text-9xl text-[#02C7FE]">
            SSAFY-STAR
          </div>
          <div className="-mt-80">
            <div className="text-center font-['nemo030'] text-4xl text-white">
              전체 싸피생 : 1000명
            </div>
            <div className="mt-10 text-center font-['nemo030'] text-4xl text-white">
              현재 사용자 : 200명
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
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_temp_2.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_temp_3.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_temp_4.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_temp_5.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_temp_6.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_temp_7.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="h-screen w-screen items-center bg-[url('/public/background/landing_temp_8.png')] bg-cover bg-center bg-no-repeat"></div>
      <FloatingMenu />
    </div>
  );
}
export default App;
