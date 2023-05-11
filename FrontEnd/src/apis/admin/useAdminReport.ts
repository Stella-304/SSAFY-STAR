import { useQuery } from "react-query";
import { api } from "../api";
import { ADMIN_REPORT } from "../../utils/urls";

const fetcher = () =>
  api
    .get(ADMIN_REPORT, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

const useAdminReport = (setReportList: (params: any) => void) => {
  return useQuery("/adminreportlist", fetcher, {
    retry: 0,
    onSuccess: (data) => {
      //신고항목, 신고내용, 처리내용, 누가핸ㅆ는지
      //처리중, 처리완료
      setReportList(data.value);
    },
  });
};

export default useAdminReport;
