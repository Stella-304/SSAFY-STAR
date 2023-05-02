import { useMutation } from "react-query";
import axios from "axios";
import { CARD_SUBMIT_URL } from "../../utils/urls";
import { CardSubmitType } from "../../types/CardSubmit";
import { useNavigate } from "react-router-dom";
const fetcher = (payload: CardSubmitType) =>
  axios
    .post(CARD_SUBMIT_URL, payload, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then(({ data }) => data);

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
