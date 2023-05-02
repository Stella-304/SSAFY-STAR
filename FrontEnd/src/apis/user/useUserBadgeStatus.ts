import { useQuery } from "react-query";
import { BADGE_STATUS_URL } from "../../utils/urls";
import { sessionApi } from "../api";

const fetcher = (type: string) =>
  sessionApi
    .get(BADGE_STATUS_URL + "/" + type)
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
    onSuccess: () => {},
    onError: () => {},
  });
};

export default useUserBadgeStatus;
