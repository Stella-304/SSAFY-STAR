import { useMutation } from "react-query";
import { CARD_SUBMIT_URL } from "../../utils/urls";
import { CardSubmitType } from "../../types/CardSubmit";
import { useNavigate } from "react-router-dom";
import { sessionApi } from "../api";
const fetcher = (payload: CardSubmitType) =>
  sessionApi
    .post(CARD_SUBMIT_URL, payload,{})
    .then(({ data }) => data);

/**
 * 카드 정보를 입력한다.
 * 성공시 메인으로
 * 실패시 알림
 * @returns 
 */
const useCardSubmit = () => {
  const navigate = useNavigate();
  return useMutation(fetcher, {
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      alert("잠시후 시도해주세요");
    },
  });
};

export default useCardSubmit;
