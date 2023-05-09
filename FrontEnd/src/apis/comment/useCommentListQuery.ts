import { COMMENT_LIST } from "@/constants/queryKeys";
import { COMMENT_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";

const fetcher = (cardId: number) => {
  axios.get(COMMENT_URL, { params: { cardId } }).then(({ data }) => data.value);
};

const useCommentListQuery = (cardId: number) => {
  return useQuery([COMMENT_LIST, cardId], () => fetcher(cardId), {
    onSuccess: (data) => {
      console.log("카드 코멘트 목록 불러오기", data);
    },
  });
};

export default useCommentListQuery;
