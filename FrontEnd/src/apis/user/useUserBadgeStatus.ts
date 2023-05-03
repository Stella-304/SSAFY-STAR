import { useQuery } from "react-query";
import { BADGE_STATUS_URL } from "../../utils/urls";
import { api } from "../api";

const fetcher = (type: string) =>
  api
    .get(BADGE_STATUS_URL + "/" + type, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

/**
 * 뱃지 상태를 확인한다.
 * 싸피, 회사 인증중인지 확인한다.
 * @param type SSAFY, COMPANY
 * @returns NO_REQUEST,IN_PROGRESS,FINISH
 */
const useUserBadgeStatus = (type: string) => {
  return useQuery(["/userbadgestatus", type], () => fetcher(type), {
    enabled: false,
    retry: 0,
    onSuccess: () => {},
    onError: () => {},
  });
};

export default useUserBadgeStatus;
