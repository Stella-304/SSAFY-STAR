import { useEffect } from "react";
import FormLayout from "../../../components/Layout/FormLayout";
import InfoModi from "./InfoModi";
import { useDispatch } from "react-redux";
import { setPath } from "../../../stores/page/path";
export default function Mypage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPath("mypage")); //현 위치 표시
    return () => {
      dispatch(setPath("")); //나갈땐 리셋
    };
  }, []);
  return (
    <FormLayout>
      <div className="flex flex-col items-center h-full gap-24 text-white font-bold font-neob w-full">
        <div>
          <span className="mt-80 mb-40 block text-4xl font-bold font-neob text-center">마이페이지</span>
        </div>
        <InfoModi />
      </div>
    </FormLayout>
  );
}
