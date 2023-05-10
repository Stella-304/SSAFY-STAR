import { useQuery } from "react-query";
import { api } from "../api";
import { REPORT_URL } from "../../utils/urls";

const fetcher = () => api.get(REPORT_URL, {}).then(({ data }) => data);

const useReportCategory = (setReportCategoryList: (params: any) => void) => {
  return useQuery("/reportlist", fetcher, {
    retry: 0,
    onSuccess: (data) => {
      setReportCategoryList(data.value);
    },
  });
};

export default useReportCategory;
