import axios from "axios";
import { useQuery } from "react-query";
import { STAR_FILTER_INFO } from "../../constants/queryKeys";
import { STAR_FILTER_INFO_URL } from "../../utils/urls";

const fetcher = (searchColumn: string, searchValue: string) =>
  axios
    .get(STAR_FILTER_INFO_URL, {
      params: { searchColumn: searchColumn, searchValue: searchValue },
    })
    .then(({ data }) => data.value);

export default function useStarFilterInfoQuery(
  searchColumn: string,
  searchValue: string,
) {
  return useQuery(
    [STAR_FILTER_INFO, searchColumn, searchValue],
    () => fetcher(searchColumn, searchValue),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log("별자리 필터 검색 불러오기 성공", data);
      },
    },
  );
}
