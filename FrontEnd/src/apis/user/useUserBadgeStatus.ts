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
 * @param setStatus 상태 적용 함수
 * @param setImgsrc 이미지 적용 함수
 * @returns NO_REQUEST,IN_PROGRESS,FINISH
 */
const useUserBadgeStatus = (
  type: string,
  setStatus: (params: any) => void,
  setImgsrc: (params: string) => void,
) => {
  return useQuery(["/userbadgestatus", type], () => fetcher(type), {
    enabled: false,
    retry: 0,
    onSuccess: (data) => {
      setStatus(data.value.badgeStatus);
      setImgsrc(data.value.imageUrl);
    },
    onError: () => {
      setStatus("");
      setImgsrc("");
    },
  });
};

export default useUserBadgeStatus;
