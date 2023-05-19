import { useMutation } from "react-query";
import { FIND_PWD_URL } from "../../utils/urls";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

interface Payload {
  email: string;
}
const fetcher = (payload: Payload) =>
  api
    .post(FIND_PWD_URL, {
      email: payload.email,
    })
    .then(({ data }) => data);

/**
 * 이메일과 아이디를 입력후 이메일로 초기화 비밀번호를 전달한다.
 * @returns
 */
const useFindPwd = () => {
  const navigate = useNavigate();
  return useMutation(fetcher, {
    retry: 0,
    onSuccess: () => {
      alert("이메일을 전송 하였습니다.");
      navigate("/login");
    },
    onError: (e: any) => {
      if (e.response.status === 404) {
        alert("등록되지 않은 이메일입니다.");
        return;
      }
      alert("잠시후 다시 시도해주세요.");
    },
  });
};

export default useFindPwd;
