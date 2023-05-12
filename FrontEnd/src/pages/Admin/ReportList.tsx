import { useState } from "react";
import useAdminReport from "@/apis/admin/useAdminReport";
import { ReportListType } from "@/types/ReportListType";

export default function ReportList() {
  const [reportList, setReportList] = useState<ReportListType[]>([]);

  useAdminReport(setReportList);

  return (
    <div className="flex">
      <div className="flex w-200 flex-col gap-16 overflow-auto ">
        {reportList &&
          reportList.map((ele) => (
            <div className="b-1 rounded-4">
              <div>{ele.article}</div>
              <div>{ele.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
