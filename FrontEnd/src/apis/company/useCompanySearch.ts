import { useQuery } from "react-query";
import { COMPANY_SEARCH_URL } from "../../utils/urls";
import { api } from "../api";

const fetcher = (input: string) =>
  api
    .get(COMPANY_SEARCH_URL, {
      params: { query: input },
    }).then((res) => res.data);

const useCompanySearch = (searchName: string) => {
  return useQuery(["/companyname", searchName], () => fetcher(searchName), {
    enabled:false, 
    onSuccess:()=>{},
    onError:()=>{}
  });
};

export default useCompanySearch;
