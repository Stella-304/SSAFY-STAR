import { useQuery } from "react-query";
import axios from "axios";
import { COMPANY_SEARCH_URL } from "../../utils/urls";

const fetcher = (input: string) =>
  axios
    .get(COMPANY_SEARCH_URL, {
      params: { query: input },
    })
    .then((res) => res.data);
const useCompanySearch = (searchName: string) => {
  return useQuery(["/companyname", searchName], () => fetcher(searchName), {});
};

export default useCompanySearch;
