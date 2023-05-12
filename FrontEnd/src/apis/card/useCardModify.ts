import { useMutation } from "react-query";
import { CARD_SUBMIT_URL } from "../../utils/urls";
import { CardSubmitType } from "../../types/CardSubmit";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { isExpire } from "../error/isExpire";
import { useDispatch } from "react-redux";
import { logout } from "@/stores/user/user";
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
  const dispatch = useDispatch();
  return useMutation(fetcher, {
    retry: 0,
    onSuccess: () => {
      navigate("/mycard");
    },
    onError: (e: any) => {
      if (isExpire(e.response.status)) {
        alert("다시 로그인 해주세요");
        dispatch(logout());
        navigate("/");
        return;
      }
      alert("잠시후 시도해 주세요");
    },
  });
};

export default useCardModify;
