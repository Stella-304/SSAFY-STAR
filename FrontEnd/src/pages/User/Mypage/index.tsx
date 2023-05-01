import { useState } from "react";
import SmallButton from "../../../components/Button/SmallButton";
import EarthLayout from "../../../components/Layout/EarthLayout";
import InfoModi from "./InfoModi";
import Certify from "./Certify";
export default function Mypage() {
  const [page, setPage] = useState(0);

  return (
    <EarthLayout>
      <div className="flex flex-col justify-around h-full">
        <div>
          <span className="text-4xl block font-bold">Mypage</span>
        </div>
        <div className="mt-8 flex justify-around">
          <SmallButton value="정보수정" onClick={()=>setPage(0)}/>
          <SmallButton value="인증"  onClick={()=>setPage(1)}/>
        </div>
        {page===0?<InfoModi />:<Certify/>}
        

      </div>
    </EarthLayout>
  );
}
