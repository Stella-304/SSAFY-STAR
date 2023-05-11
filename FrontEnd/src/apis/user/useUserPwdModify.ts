import { useMutation } from "react-query";
import { USER_PWD_MODY_URL } from "../../utils/urls";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { isExpire } from "../error/isExpire";
const fetcher = (pwd: string) =>
  api
    .put(
      USER_PWD_MODY_URL,
      {},
      {
        params: {
          newPwd: pwd,
        },
        headers: { Authorization: sessionStorage.getItem("accessToken") },
      },
    )
    .then(({ data }) => data);

/**
 * 유저의 정보를 수정 - 비밀번호
 * @returns
 */
const useUserPwdModify = () => {
  const navigate = useNavigate();
  return useMutation(fetcher, {
    retry: 0,
    onSuccess: () => {
      alert("수정완료");
      navigate("/mypage");
    },
    onError: (e: any) => {
      if (!isExpire(e.response.status)) {
        alert("잠시후에 시도해주세요");
      }
    },
  });
};

export default useUserPwdModify;
