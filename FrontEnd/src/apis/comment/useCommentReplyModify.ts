import { useMutation, useQueryClient } from "react-query";
import { REPLY_URL } from "../../utils/urls";
import { api } from "../api";
import { ReplyType } from "@/types/ReplyType";
import { COMMENT_LIST } from "@/constants/queryKeys";

const fetcher = (payload: ReplyType) =>
  api
    .put(REPLY_URL, payload, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

const useCommentReplyModify = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      return queryClient.invalidateQueries(COMMENT_LIST);
    },
    onError: (e: any) => {},
  });
};

export default useCommentReplyModify;
