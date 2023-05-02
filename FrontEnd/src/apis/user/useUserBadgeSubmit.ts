import { useMutation } from "react-query";
import { BADGE_SUBMIT_URL } from "../../utils/urls";
import { BadgeSubmitType } from "../../types/BadgeSubmit";
import useUserBadgeStatus from "./useUserBadgeStatus";
import { fileApi } from "../api";

//이미지 파일을 입력하기
const fetcher = (payload: BadgeSubmitType) =>
  fileApi
    .post(BADGE_SUBMIT_URL, payload.formdata,{headers:{Authorization:sessionStorage.getItem("accessToken")}})
    .then(({ data }) => data);

/**
 * 뱃지 인증을 위해 관련 이미지를 전송한다.
 * @param type [SSAFY, COMPANY]
 * @returns 
 */
const useUserBadgeSubmit = (type: string) => {
  const statusQuery = useUserBadgeStatus(type);
  return useMutation(fetcher, {
    onSuccess: () => {
      //등록 완료
      //상태 업데이트
      statusQuery.refetch();
    },
    onError: () => {
      alert("이미지 등록 에러");
    },
  });
};

export default useUserBadgeSubmit;
