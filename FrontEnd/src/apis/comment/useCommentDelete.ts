import { useMutation, useQueryClient } from "react-query";
import { COMMENT_URL } from "../../utils/urls";
import { api } from "../api";
import { COMMENT_LIST } from "@/constants/queryKeys";
const fetcher = (cardCommentId: number) =>
  api
    .delete(COMMENT_URL, {
      params: { cardCommentId: cardCommentId },
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

const useCommentDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      return queryClient.invalidateQueries(COMMENT_LIST);
    },
    onError: (e: any) => {},
  });
};

export default useCommentDelete;
