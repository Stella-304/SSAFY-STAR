import { useMutation } from "react-query";
import axios from "axios";
import { BADGE_SUBMIT_URL } from "../../utils/urls";

//이미지 파일을 입력하기
const fetcher = (payload: any) =>
  axios.post(BADGE_SUBMIT_URL, payload.formdata, {}).then(({ data }) => data);

const useStarFilterInfo = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("별자리 필터 검색 불러오기 성공", data);
    },
  });
};

export default useStarFilterInfo;
