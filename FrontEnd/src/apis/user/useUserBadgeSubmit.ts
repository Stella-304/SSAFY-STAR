import { useMutation } from "react-query";
import axios from "axios";
import { BADGE_SUBMIT_URL } from "../../utils/urls";

//이미지 파일을 입력하기
const fetcher = (type: string) =>
  axios
    .post(BADGE_SUBMIT_URL + "/" + type, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then(({ data }) => data);

const useUserBadgeSubmit = () => {
  return useMutation(fetcher, {});
};

export default useUserBadgeSubmit;
