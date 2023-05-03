import { useQuery } from "react-query";
import { USER_DETAIL_URL } from "../../utils/urls";
import { api } from "../api";

const fetcher = () =>
  api
    .get(USER_DETAIL_URL, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

/**
 * 유저의 세부정보를 가져온다.
 * - 이름, 닉네임, 이메일, 카드등록여부
 * @returns
 */
const useUserDetail = () => {
  return useQuery("/userdetail", fetcher, { retry: 0,
    onSuccess:(data)=>{
      console.log(data.value);
    }
  });
};

export default useUserDetail;
