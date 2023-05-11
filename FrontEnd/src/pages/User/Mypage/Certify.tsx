import { useEffect, useState } from "react";
import FormLayout from "../../../components/Layout/FormLayout";
import { useDispatch } from "react-redux";
import { setPath } from "../../../stores/page/path";
import ImageInput from "../../../components/Input/ImageInput";
import MidButton from "@/components/Button/MidButton";
import XSmallButton from "@/components/Button/XSmallButton";

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
      <div className="flex flex-col justify-around gap-16 font-neob text-white">
        <div>
          <div>
            <span className="mb-10 mt-40 block text-center text-4xl font-bold">
              {page} Certify
            </span>
          </div>
          <div className="flex justify-around gap-16">
            <XSmallButton
              value="싸피인증"
              onClick={() => setPage("SSAFY")}
              disable={page === "SSAFY"}
            />
            <XSmallButton
              value="회사인증"
              onClick={() => setPage("COMPANY")}
              disable={page === "COMPANY"}
            />
          </div>
        </div>
        <div className="flex flex-col justify-around">
          <div>
            <div className="flex justify-center">
              <ImageInput id={page} />
            </div>
          </div>
        </div>
      </div>
    </FormLayout>
  );
}
