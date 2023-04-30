import MidButton from "../Button/MidButton";

export default function BigRequest() {
    return (
      <div className="flex flex-col items-center justify-around h-full">
        <div className="w-500 h-500 bg-blue-400">
            이미지
        </div>
        <div className="flex w-500 justify-around gap-16">
            <MidButton value="승인"/>
            <MidButton value="거절"/>
        </div>
      </div>
    );
  }
    