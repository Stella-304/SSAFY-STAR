import { ReactNode } from "react";

interface props {
  children: ReactNode;
  onClose: () => void;
}
export default function ModalLayout(props: props) {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-full items-center justify-center">
      <div className="relative">
        <div className="absolute right-4 top-4" onClick={props.onClose}>
          <img
            src="/icons/exit.svg"
            className="h-24 w-24 cursor-pointer"
            alt="닫기"
          />
        </div>
        <div className="h-500 w-400 overflow-auto rounded-8 bg-white pt-24">
          {props.children}
        </div>
      </div>
    </div>
  );
}
