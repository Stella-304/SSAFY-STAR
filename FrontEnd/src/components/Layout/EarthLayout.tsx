import { ReactNode } from "react";

interface props {
  children: ReactNode;
}
export default function EarthLayout(props: props) {
  return (
    <div className="w-full h-screen flex items-center bg-[url('/public/background/stars.png')]">
      <div className="w-1200 h-650 flex m-auto">
        {/* 왼쪽 배경 */}
        <div className="w-600 h-650  bg-[url('/public/background/earth_back1.png')] bg-cover	bg-center"></div>
        {/* 오른쪽 영역 */}
        <div className="w-600 h-650 bg-white flex justify-center items-center">
          <div className="w-400 h-550">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
