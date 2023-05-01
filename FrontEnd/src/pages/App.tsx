import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className="w-full h-screen flex flex-col mt-20 ml-20 gap-20">
      <button
        className="w-200 h-100 border-2 border-blue-500 text-30 hover:bg-blue-500 hover:text-white"
        onClick={() => navigate("/login")}
      >
        로그인
      </button>
      <button
        className="w-200 h-100 border-2 border-blue-500 text-30 hover:bg-blue-500 hover:text-white"
        onClick={() => navigate("/signup")}
      >
        회원가입
      </button>
    </div>
  );
}
export default App;
