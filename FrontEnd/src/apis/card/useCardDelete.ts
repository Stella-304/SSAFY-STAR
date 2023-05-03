import { useMutation } from "react-query";
import { CARD_MYCARD_URL } from "../../utils/urls";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
const fetcher = () =>
  api
    .delete(CARD_MYCARD_URL, {
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
      navigate("/");
    },
    onError: (e: any) => {
      if (e.response.status === 403) {
        alert("로그인하고 시도해주세요");
        navigate("/login");
      } else {
        alert("잠시후 시도해 주세요");
      }
    },
  });
};

export default useCardSubmit;
