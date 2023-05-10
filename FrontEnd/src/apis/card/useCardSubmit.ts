import { useMutation } from "react-query";
import { CARD_SUBMIT_URL } from "../../utils/urls";
import { CardSubmitType } from "../../types/CardSubmit";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
const fetcher = (payload: CardSubmitType) =>
  api
    .post(CARD_SUBMIT_URL, payload, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
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
    retry: 0,
    onSuccess: () => {
      //입력에 성공하면 수정된 이름을 로컬의 user를 업데이트 해준다.
      navigate("/universe");
    },
    onError: (e: any) => {
      if (e.response.status === 403) {
        alert("등록하신 카드가 있습니다.");
      } else {
        alert("잠시후 시도해 주세요");
      }
    },
  });
};

export default useCardSubmit;
