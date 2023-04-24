import { ReactNode } from "react";

interface props {
  children: ReactNode;
}
export default function EarthLayout(props: props) {
  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-800 h-300 flex m-auto">
        {/* 왼쪽 배경 */}
        <div className="w-400 h-300  bg-[url('/public/background/earth_back1.png')]"></div>
        {/* 오른쪽 영역 */}
        <div className="w-400 h-300 bg-blue-600">{props.children}</div>
      </div>
    </div>
  );
}
