import { useMutation, useQueryClient } from "react-query";
import { REPLY_URL } from "../../utils/urls";
import { api } from "../api";
import { COMMENT_LIST } from "@/constants/queryKeys";
import { ReplyType } from "@/types/ReplyType";
const fetcher = (payload: ReplyType) =>
  api
    .post(REPLY_URL, payload, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

const useCommentReplySubmit = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("카드 코멘트 답글 등록 성공!", data);
      return queryClient.invalidateQueries(COMMENT_LIST);
    },
    onError: (e: any) => {
      console.log("카드 코멘트 답글 등록 에러!", e);
    },
  });
};

export default useCommentReplySubmit;
