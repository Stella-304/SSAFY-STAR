import { ReactNode } from "react";
import FloatingMenu from "./FloatingMenu";

interface props {
  children: ReactNode;
}
export default function EarthLayout(props: props) {
  return (
    <div className="flex h-screen w-full items-center bg-[url('/public/background/stars.png')]">
      <div className="m-auto flex h-650 w-1200">
        {/* 왼쪽 배경 */}
        <div className="h-650 w-600  bg-[url('/public/background/earth_back1.png')] bg-cover	bg-center"></div>
        {/* 오른쪽 영역 */}
        <div className="flex h-650 w-600 items-center justify-center bg-white">
          <div className="h-550 w-400">{props.children}</div>
        </div>
      </div>
      <FloatingMenu />
    </div>
  );
}
