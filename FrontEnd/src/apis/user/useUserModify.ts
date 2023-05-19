import { useMutation } from "react-query";
import { USER_URL } from "../../utils/urls";
import { api } from "../api";
import { UserModifyType } from "../../types/UserModifyType";
import { useNavigate } from "react-router-dom";
import { logout, setUser } from "@/stores/user/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { isExpire } from "../error/isExpire";

const fetcher = (payload: UserModifyType) =>
  api
    .put(USER_URL, payload, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

/**
 * 유저의 정보를 수정 - 이름, 닉네임
 * @param nickname 닉네임
 * @returns
 */
const useUserModify = (nickname: string) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation(fetcher, {
    retry: 0,
    onSuccess: () => {
      alert("수정완료");
      dispatch(setUser({ ...user, nickname: nickname }));
      navigate("/mypage");
    },
    onError: (e: any) => {
      if (isExpire(e.response.status)) {
        alert("다시 로그인 해주세요");
        dispatch(logout());
        navigate("/");
        return;
      }
      if (e.response.status === 500) {
        alert("중복된 닉네임 입니다.");
        return;
      }
      alert("잠시후 다시 시도해 주세요");
    },
  });
};

export default useUserModify;
