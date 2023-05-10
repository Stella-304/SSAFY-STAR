import { useState } from "react";
import SmallButton from "../../components/Button/SmallButton";
import AcceptList from "./AcceptList";
import ReportList from "./ReportList";

export default function Admin() {
  const [page, setPage] = useState(0);
  return (
    <div className="flex h-screen items-center justify-center bg-gray-700">
      <div className="flex h-4/5">
        <div className="flex flex-col gap-16">
          <SmallButton
            value="승인할거"
            onClick={() => {
              setPage(0);
            }}
          />
          <SmallButton
            value="전체내역"
            onClick={() => {
              setPage(1);
            }}
          />
          <SmallButton
            value="신고내역"
            onClick={() => {
              setPage(2);
            }}
          />
        </div>
        <div className="flex min-h-570 w-1000 justify-center border-1">
          {page === 0 ? (
            <AcceptList type="yet" />
          ) : page === 1 ? (
            <AcceptList type="all" />
          ) : (
            <ReportList />
          )}
        </div>
      </div>
    </div>
  );
}
