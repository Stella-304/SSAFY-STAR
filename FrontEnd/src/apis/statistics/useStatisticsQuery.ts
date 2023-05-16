import axios from "axios";
import { useQuery } from "react-query";
import { STATISTICS_CHART } from "../../constants/queryKeys";
import { CHART_URL } from "../../utils/urls";

const fetcher = (sort: string) =>
  axios
    .get(CHART_URL, {
      params: {
        sort: sort,
      },
    })
    .then(({ data }) => data.value);

export default function useStatisticsQuery(sort: string) {
  return useQuery([STATISTICS_CHART, sort], () => fetcher(sort), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {},
    onError: (e) => {},
  });
}
