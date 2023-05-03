import ImageInput from "../../../components/Input/ImageInput";

export default function Certify() {
  return (
    <div className="flex h-400 flex-col justify-around">
      {/* 싸피인증 */}
      <div>
        <div>
          <span className="text-1xl font-bold">싸피 인증</span>
        </div>
        <div className="flex justify-center  gap-16">
          <ImageInput id="SSAFY">{}</ImageInput>
        </div>
      </div>

      {/* 회사인증 */}
      <div>
        <div>
          <span className="text-1xl font-bold">회사 인증</span>
        </div>
        <div className="flex justify-center  gap-16">
          <ImageInput id="COMPANY">{}</ImageInput>
        </div>
      </div>
    </div>
  );
}
