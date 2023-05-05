import { useState } from "react";
import SmallButton from "../../../components/Button/SmallButton";
import EarthLayout from "../../../components/Layout/EarthLayout";
import InfoModi from "./InfoModi";
import Certify from "./Certify";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
export default function Mypage() {
  const [page, setPage] = useState(0);
  const { nickname } = useSelector((state: RootState) => state.user);

  return (
    <EarthLayout>
      <div className="flex h-full flex-col justify-around">
        <div>
          <span className="block text-4xl font-bold">Mypage</span>
          <span className="block text-sm font-bold">
            {nickname}님 어서오세요!
          </span>
        </div>
        <div className="mt-8 flex justify-around">
          <SmallButton value="정보수정" onClick={() => setPage(0)} />
          <SmallButton value="인증" onClick={() => setPage(1)} />
        </div>
        {page === 0 ? <InfoModi /> : <Certify />}
      </div>
    </EarthLayout>
  );
}
