import { useQuery } from "react-query";
import axios from "axios";
import { CARD_LIST_URL } from "../../utils/urls";

const fetcher = () => axios.get(CARD_LIST_URL, {}).then(({ data }) => data);

const useCardlist = () => {
  return useQuery("/cardlist", fetcher, {});
};

export default useCardlist;
