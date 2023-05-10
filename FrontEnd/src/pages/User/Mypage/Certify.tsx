import { useEffect, useState } from "react";
import FormLayout from "../../../components/Layout/FormLayout";
import { useDispatch } from "react-redux";
import { setPath } from "../../../stores/page/path";
import ImageInput from "../../../components/Input/ImageInput";
import MidButton from "@/components/Button/MidButton";

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
    <FormLayout>
      <div className="flex h-full flex-col justify-around text-white font-neob">
        <div>
        <div>
          <span className="mt-80 mb-40 block text-5xl font-bold text-center">Certify</span>
        </div>
          <div className="mt-16 flex justify-around gap-16">
            <MidButton
              value="싸피인증"
              onClick={() => setPage("SSAFY")}
              disable={page === "SSAFY"}
            />
            <MidButton
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
    </FormLayout>
  );
}
