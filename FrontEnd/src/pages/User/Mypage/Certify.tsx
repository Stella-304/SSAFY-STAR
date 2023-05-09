import { useEffect, useState } from "react";
import EarthLayout from "../../../components/Layout/EarthLayout";
import { useDispatch } from "react-redux";
import { setPath } from "../../../stores/page/path";
import ImageInput from "../../../components/Input/ImageInput";
import SmallButton from "../../../components/Button/SmallButton";

export default function Certify() {
  const [page, setPage] = useState("SSAFY");
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
          <div className="mt-16 flex justify-around gap-16">
            <SmallButton
              value="싸피인증"
              onClick={() => setPage("SSAFY")}
              disable={page === "SSAFY"}
            />
            <SmallButton
              value="회사인증"
              onClick={() => setPage("COMPANY")}
              disable={page === "COMPANY"}
            />
          </div>
        </div>
        <div className="flex h-400 flex-col justify-around">
          <div>
            <div className="flex justify-center  gap-16">
              <ImageInput id={page} />
            </div>
          </div>
        </div>
      </div>
    </EarthLayout>
  );
}
