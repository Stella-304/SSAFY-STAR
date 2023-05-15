import { useQuery } from "react-query";
import { STAR_FILTER_INFO } from "../../constants/queryKeys";
import { STAR_FILTER_INFO_URL } from "../../utils/urls";
import { api } from "../api";

const fetcher = (
  searchColumn: string,
  searchValue: string,
  searchValue2: string,
  searchValue3: string,
) =>
  api
    .get(STAR_FILTER_INFO_URL, {
      params: {
        searchColumn: searchColumn,
        searchValue: searchValue,
        searchValue2: searchValue2,
        searchValue3: searchValue3,
      },
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data.value);

export default function useStarFilterInfoQuery(
  searchColumn: string,
  searchValue: string,
  searchValue2: string,
  searchValue3: string,
) {
  return useQuery(
    [STAR_FILTER_INFO, searchColumn, searchValue, searchValue2, searchValue3],
    () => fetcher(searchColumn, searchValue, searchValue2, searchValue3),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {},
    },
  );
}
