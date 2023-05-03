import { useQuery } from "react-query";
import { CARD_MYCARD_URL } from "../../utils/urls";
import { api } from "../api";
const fetcher = () =>
  api
    .get(CARD_MYCARD_URL, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

const useMyCard = () => {
  return useQuery("/mycardinfo", fetcher, { retry: 0 });
};

export default useMyCard;
