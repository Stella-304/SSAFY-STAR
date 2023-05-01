import { useMutation } from "react-query";
import axios from "axios";
import { BADGE_SUBMIT_URL } from "../../utils/urls";
import { BadgeSubmitType } from "../../types/BadgeSubmit";

//이미지 파일을 입력하기
const fetcher = (payload: BadgeSubmitType) =>
  axios
    .post(BADGE_SUBMIT_URL , payload.formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then(({ data }) => data);

const useUserBadgeSubmit = () => {
  return useMutation(fetcher, {});
};

export default useUserBadgeSubmit;
