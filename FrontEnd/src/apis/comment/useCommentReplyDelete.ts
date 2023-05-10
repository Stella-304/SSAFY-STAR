import { useMutation, useQueryClient } from "react-query";
import { REPLY_URL } from "../../utils/urls";
import { api } from "../api";
import { COMMENT_LIST } from "@/constants/queryKeys";
const fetcher = (cardCommentId: number) =>
  api
    .delete(REPLY_URL, {
      params: { cardCommentId },
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

const useCommentReplyDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("카드 코멘트 삭제 완료!", data);
      return queryClient.invalidateQueries(COMMENT_LIST);
    },
    onError: (e: any) => {
      console.log("카드 코멘트 삭제 에러!", e);
    },
  });
};

export default useCommentReplyDelete;
