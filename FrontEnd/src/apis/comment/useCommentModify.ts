import { useMutation, useQueryClient } from "react-query";
import { COMMENT_URL } from "../../utils/urls";
import { api } from "../api";
import { CommentType } from "@/types/CommentType";
import { COMMENT_LIST } from "@/constants/queryKeys";
const fetcher = (payload: CommentType) =>
  api
    .put(COMMENT_URL, payload, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

const useCommentModify = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("카드 코멘트 수정 완료", data);
      return queryClient.invalidateQueries(COMMENT_LIST);
    },
    onError: (e: any) => {
      console.log("카드 코멘트 수정 에러!!", e);
    },
  });
};

export default useCommentModify;
