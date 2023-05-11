import { ReactNode, CSSProperties } from "react";

interface props {
  children: ReactNode;
  onClose: () => void;
  modalWidth?: string;
  modalHeight?: string;
}
export default function ModalLayout(props: props) {
  const style: CSSProperties = {
    width: props.modalWidth,
    height: props.modalHeight,
  };
  return (
    <div className="fixed left-0 top-0 flex h-screen w-full items-center justify-center">
      <div className="relative">
        <div className="bg-red absolute right-4 top-4" onClick={props.onClose}>
          <img
            src="/icons/exit-white.svg"
            className="h-24 w-24 cursor-pointer"
            alt="닫기"
          />
        </div>
        <div
          className="from-opacity-80 to-opacity-40 m-auto h-500 w-400 overflow-y-auto rounded-lg border-5 border-white bg-black pt-24 shadow-neon scrollbar-thin scrollbar-thumb-white"
          style={style}
        >
          {/* <div className="h-500 w-400 rounded-8 bg-white pt-24" style={style}> */}
          {props.children}
        </div>
      </div>
    </div>
  );
}
