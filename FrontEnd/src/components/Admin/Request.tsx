import SmallButton from "../Button/SmallButton";

export default function Request() {
    return (
      <div className="flex flex-col items-center">
        <div className="w-150 h-150 bg-blue-400">
            이미지
        </div>
        <div className="flex justify-around gap-16">
            <SmallButton value="승인"/>
            <SmallButton value="거절"/>
        </div>
      </div>
    );
  }
    