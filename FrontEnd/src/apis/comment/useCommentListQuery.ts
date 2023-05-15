import { COMMENT_LIST } from "@/constants/queryKeys";
import { COMMENT_URL } from "@/utils/urls";
import { api } from "../api";
import { useQuery } from "react-query";

const fetcher = (cardId?: number) =>
  api
    .get(COMMENT_URL, {
      params: { cardId: cardId },
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data.value);

const useCommentListQuery = (cardId?: number) => {
  return useQuery([COMMENT_LIST, cardId], () => fetcher(cardId), {
    enabled: !!cardId,
    onSuccess: (data) => {

    },
    onError: (e) => {

    },
  });
};

export default useCommentListQuery;
