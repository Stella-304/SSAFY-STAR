import { ReactNode } from "react";
import HeaderMenu from "./HeaderMenu";

interface props {
  children: ReactNode;
}
export default function FormLayout(props: props) {
  return (
    <div className="flex h-screen w-full items-center bg-[url('/public/background/form_background.png')] bg-cover bg-center">
      <div className="m-auto flex h-650 w-1200 rounded-35">
        {/* 왼쪽 배경 */}
        <div className="h-650 w-600  rounded-l-35 bg-[url('/public/background/earth_back1.png')]    bg-cover bg-center"></div>
        {/* 오른쪽 영역 */}
        <div className="flex h-650 w-600 items-center justify-center rounded-r-35 bg-slate-50">
          <div className="h-550 w-400">{props.children}</div>
        </div>
      </div>
      <HeaderMenu />
    </div>
  );
}
