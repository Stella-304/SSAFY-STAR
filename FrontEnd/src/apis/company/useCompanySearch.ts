import { useQuery } from "react-query";
import { COMPANY_SEARCH_URL } from "../../utils/urls";
import { api } from "../api";

const fetcher = (input: string) =>
  api
    .get(COMPANY_SEARCH_URL+"?query="+input, {
      // params: { query: input },
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => {
      alert(data)
      return data
    });

/**
 * 회사명을 검색시 데이터베이스의 회사명을 보여줍니다.
 * @param searchName
 * @param setSearchList
 * @returns
 */
const useCompanySearch = (searchName: string) => {
  return useQuery(["/companyname", searchName], () => fetcher(searchName), {
    onSuccess:(data)=>{
      console.log("무야 무야")
      alert(data);
      // setSearchList([]);
    },
    onError: () => {
      console.log("뭔데")
    },
    onSettled: () => {
      console.log("뭐야")
    },
    enabled: false,
    retry: 0,
  });
};

export default useCompanySearch;
