import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col mt-20 ml-20 gap-20">
      <button
        className="w-200 h-100 border-2 border-blue-500 text-30 hover:bg-blue-500 hover:text-white"
        onClick={() => navigate("/test1")}
      >
        Test1-경택
      </button>
      <button
        className="w-200 h-100 border-2 border-blue-500 text-30 hover:bg-blue-500 hover:text-white"
        onClick={() => navigate("/test2")}
      >
        Test2-준배
      </button>
      <button
        className="w-200 h-100 border-2 border-blue-500 text-30 hover:bg-blue-500 hover:text-white"
        onClick={() => navigate("/test3")}
      >
        Test3-정원
      </button>
    </div>
  );
}
export default App;
