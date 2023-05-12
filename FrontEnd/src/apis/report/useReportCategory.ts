import { useQuery } from "react-query";
import { api } from "../api";
import { REPORT_URL } from "../../utils/urls";
import { isExpire } from "../error/isExpire";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/stores/user/user";

const fetcher = () =>
  api
    .get(REPORT_URL, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

const useReportCategory = (setReportCategoryList: (params: any) => void) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useQuery("/reportlist", fetcher, {
    retry: 0,
    onSuccess: (data) => {
      setReportCategoryList(data.value);
    },
    onError: (e: any) => {
      if (isExpire(e.response.status)) {
        alert("다시 로그인 해주세요");
        dispatch(logout());
        navigate("/");
        return;
      }
      alert("로그인후 이용해 주세요");
    },
  });
};

export default useReportCategory;
