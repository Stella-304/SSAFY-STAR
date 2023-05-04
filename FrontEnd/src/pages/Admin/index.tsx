import { useState } from "react";
import SmallButton from "../../components/Button/SmallButton";
import AcceptList from "./AcceptList";

export default function Admin() {
  const [page,setPage] = useState(0);
  return (
  <div className="h-screen flex justify-center items-center bg-gray-700">
    <div className="flex h-4/5">
      <div className="flex flex-col gap-16">
        <SmallButton value="승인할거" onClick={()=>{setPage(0)}} />
        <SmallButton value="전체내역" onClick={()=>{setPage(1)}}/>
      </div>
      <div className="flex justify-center border-1 w-1000 min-h-570">
        {page===0?<AcceptList type="yet"/>:<AcceptList type="all"/>}
      </div>
    </div>
  </div>
  );
}
