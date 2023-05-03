import { useQuery } from "react-query";
import { api } from "../api";
import { MAIN_USERNUM_URL } from "../../utils/urls";

const fetcher = () =>
  api.get(MAIN_USERNUM_URL + "/", {}).then(({ data }) => data);
/**
 * 메인 페이지에 필요한 유저 수 정보를 확인한다.
 * @returns
 */
const useUserNum = () => {
  return useQuery(["/userNum"], () => fetcher(), {
    retry: 0,
  });
};

export default useUserNum;
