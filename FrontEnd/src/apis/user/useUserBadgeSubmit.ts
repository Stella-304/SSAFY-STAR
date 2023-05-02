import { useMutation } from "react-query";
import axios from "axios";
import { BADGE_SUBMIT_URL } from "../../utils/urls";
import { BadgeSubmitType } from "../../types/BadgeSubmit";
import useUserBadgeStatus from "./useUserBadgeStatus";

//이미지 파일을 입력하기
const fetcher = (payload: BadgeSubmitType) =>
  axios
    .post(BADGE_SUBMIT_URL, payload.formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then(({ data }) => data);

const useUserBadgeSubmit = (id: string) => {
  const statusQuery = useUserBadgeStatus(id);
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
