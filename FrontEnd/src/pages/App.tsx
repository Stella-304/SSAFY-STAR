import { Outlet } from "react-router";

export default function App() {
  return (
    <div className="h-screen w-screen font-['Pretendard']">
      <Outlet />
    </div>
  );
}
