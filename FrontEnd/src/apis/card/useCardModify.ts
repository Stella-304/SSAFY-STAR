import { useMutation } from "react-query";
import { CARD_SUBMIT_URL } from "../../utils/urls";
import { CardSubmitType } from "../../types/CardSubmit";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
const fetcher = (payload: CardSubmitType) =>
  api
    .put(CARD_SUBMIT_URL, payload, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

/**
 * 카드 정보를 수정한다.
 * 성공시 메인으로
 * @returns
 */
const useCardModify = () => {
  const navigate = useNavigate();
  return useMutation(fetcher, {
    retry: 0,
    onSuccess: () => {
      navigate("/");
    },
    onError: (e: any) => {
      if (e.response.status === 403) {
        alert("로그인 해주세요.");
      } else {
        alert("잠시후 시도해 주세요");
      }
    },
  });
};

export default useCardModify;
