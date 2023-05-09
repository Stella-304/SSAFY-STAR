import { useMutation, useQueryClient } from "react-query";
import { COMMENT_URL } from "../../utils/urls";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { CommentType } from "@/types/CommentType";
import { COMMENT_LIST } from "@/constants/queryKeys";
const fetcher = (payload: CommentType) =>
  api
    .post(COMMENT_URL, payload, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

const useCommentSubmit = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("카드 코멘트 등록 성공!", data);
      return queryClient.invalidateQueries(COMMENT_LIST);
    },
    onError: (e: any) => {
      console.log("카드 코멘트 등록 에러!", e);
    },
  });
};

export default useCommentSubmit;
