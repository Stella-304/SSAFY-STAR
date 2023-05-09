import { useEffect } from "react";
import EarthLayout from "../../../components/Layout/EarthLayout";
import { useDispatch } from "react-redux";
import { setPath } from "../../../stores/page/path";
import ImageInput from "../../../components/Input/ImageInput";

export default function Certify() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPath("certify")); //현 위치 표시
    return () => {
      dispatch(setPath("")); //나갈땐 리셋
    };
  }, []);
  return (
    <EarthLayout>
      <div className="flex h-full flex-col justify-around">
        <div>
          <span className="block text-4xl font-bold">Certify</span>
        </div>
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
      </div>
    </EarthLayout>
  );
}
