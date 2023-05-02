import { useNavigate } from "react-router-dom";
import FloatingMenu from "../components/Layout/FloatingMenu";

function App() {
  const navigate = useNavigate();

  return (
    <div className="ml-20 mt-20 flex h-screen w-full flex-col gap-20">
      <FloatingMenu />
    </div>
  );
}
export default App;
