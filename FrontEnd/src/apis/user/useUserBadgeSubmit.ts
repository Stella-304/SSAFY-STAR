import { useMutation } from "react-query";
import { BADGE_SUBMIT_URL } from "../../utils/urls";
import { BadgeSubmitType } from "../../types/BadgeSubmit";
import useUserBadgeStatus from "./useUserBadgeStatus";
import { fileApi } from "../api";
import { isExpire } from "../error/isExpire";
import { logout } from "@/stores/user/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//이미지 파일을 입력하기
const fetcher = (payload: BadgeSubmitType) =>
  fileApi
    .post(BADGE_SUBMIT_URL, payload.formdata, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

/**
 * 뱃지 인증을 위해 관련 이미지를 전송한다.
 * @param type [SSAFY, COMPANY]
 * @param setStatus 상태 적용 함수
 * @param setImgsrc 이미지 적용 함수
 * @returns
 */
const useUserBadgeSubmit = (
  type: string,
  setStatus: (params: string) => void,
  setImgsrc: (params: string) => void,
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statusQuery = useUserBadgeStatus(type, setStatus, setImgsrc);
  return useMutation(fetcher, {
    retry: 0,
    onSuccess: () => {
      //등록 완료
      //상태 업데이트
      statusQuery.refetch();
      alert("이미지 등록 완료");
    },
    onError: (e: any) => {
      if (isExpire(e.response.status)) {
        alert("다시 로그인 해주세요");
        dispatch(logout());
        navigate("/");
        return;
      }
      alert("이미지 등록 에러");
    },
  });
};

export default useUserBadgeSubmit;
