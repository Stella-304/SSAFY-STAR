import { useState } from "react";
import SmallButton from "../../components/Button/SmallButton";
import AcceptYet from "./AcceptYet";
import AcceptAll from "./AcceptAll";

export default function Admin() {
  const [page,setPage] = useState(0);
  return (
  <div className="h-screen flex justify-center items-center bg-gray-700">
    <div className="flex h-800">
      <div className="flex flex-col gap-16">
        <SmallButton value="승인할거" onClick={()=>{setPage(0)}} />
        <SmallButton value="전체내역" onClick={()=>{setPage(1)}}/>
      </div>
      <div className="flex justify-center border-1 w-1000">
        {page===0?<AcceptYet/>:<AcceptAll/>}
      </div>
    </div>
  </div>
  );
}
