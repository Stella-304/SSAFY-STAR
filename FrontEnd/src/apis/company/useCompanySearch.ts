import { useQuery } from "react-query";
import { COMPANY_SEARCH_URL } from "../../utils/urls";
import { api } from "../api";

const fetcher = (input: string) =>
  api
    .get(COMPANY_SEARCH_URL, {
      params: { query: input },
      headers:{Authorization:sessionStorage.getItem("accessToken")}
    }).then((res) => res.data);

/**
 * 회사명을 검색시 데이터베이스의 회사명을 보여줍니다.
 * @param searchName 
 * @param setSearchList 
 * @returns 
 */
const useCompanySearch = (searchName: string) => {
  return useQuery(["/companyname", searchName], () => fetcher(searchName), {
    enabled:false, 
    onSuccess:(data)=>{
    },
    onError:()=>{
    },onSettled:()=>{
    }
  });
};

export default useCompanySearch;
