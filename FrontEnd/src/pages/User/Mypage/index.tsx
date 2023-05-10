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
      <div className="flex h-full flex-col justify-around">
        <div>
          <span className="block text-4xl font-bold">Mypage</span>
        </div>
        <InfoModi />
      </div>
    </FormLayout>
  );
}
