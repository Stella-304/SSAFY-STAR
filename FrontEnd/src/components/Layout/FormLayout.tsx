import { ReactNode } from "react";
import HeaderMenu from "./HeaderMenu";

interface props {
  children: ReactNode;
}
export default function FormLayout(props: props) {
  return (
    <div className="flex h-screen items-center bg-[url('/public/background/main_background.png')] bg-cover bg-center">
      <div className="from-opacity-80 to-opacity-40 relative m-auto h-5/6 w-1/3 min-w-500 overflow-y-auto rounded-lg border-5 border-white bg-gradient-to-b from-black to-darkblue2 shadow-neon scrollbar-thin scrollbar-thumb-white">
        {props.children}
      </div>
      <HeaderMenu />
    </div>
  );
}
