import { useQuery } from "react-query";
import { COMPANY_SEARCH_URL } from "../../utils/urls";
import { api } from "../api";
import { isExpire } from "../error/isExpire";
import { useNavigate } from "react-router-dom";
import { logout } from "@/stores/user/user";
import { useDispatch } from "react-redux";

const fetcher = (input: string) =>
  api
    .get(COMPANY_SEARCH_URL + "?query=" + input, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => {
      return data;
    });

/**
 * 회사명을 검색시 데이터베이스의 회사명을 보여줍니다.
 * @param searchName
 * @param setSearchList
 * @returns
 */
const useCompanySearch = (
  searchName: string,
  setSearchList: (params: any) => void,
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useQuery(["/companyname", searchName], () => fetcher(searchName), {
    onSuccess: (data) => {
      setSearchList(data.value);
    },
    onError: (e: any) => {
      if (isExpire(e.response.status)) {
        alert("다시 로그인 해주세요");
        dispatch(logout());
        navigate("/");
        return;
      }
      alert("로그인후 이용해 주세요");
      navigate("/");
      return;
    },
    enabled: false,
    retry: 0,
  });
};

export default useCompanySearch;
