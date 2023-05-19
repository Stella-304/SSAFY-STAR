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
      return queryClient.invalidateQueries(COMMENT_LIST);
    },
    onError: (e: any) => {},
  });
};

export default useCommentReplySubmit;
