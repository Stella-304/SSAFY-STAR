import { ReactNode } from "react";
import HeaderMenu from "./HeaderMenu";

interface props {
  children: ReactNode;
}
export default function FormLayout(props: props) {
  return (
    <div className="flex h-screen items-center bg-[url('/public/background/main_background.png')] bg-cover bg-center">
      <div className="m-auto from-opacity-70 to-opacity-38 relative h-4/5 w-1/3 rounded-lg border-5 border-white bg-gradient-to-b from-black to-darkblue2 shadow-neon">
        {props.children}
      </div>
      <HeaderMenu />
    </div>
  );
}
