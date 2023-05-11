import { useQuery } from "react-query";
import { BADGE_STATUS_URL } from "../../utils/urls";
import { api } from "../api";
import { isExpire } from "../error/isExpire";
import { logout } from "@/stores/user/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useQuery(["/userbadgestatus", type], () => fetcher(type), {
    enabled: false,
    retry: 0,
    onSuccess: (data) => {
      setStatus(data.value.badgeStatus);
      setImgsrc(data.value.imageUrl);
    },
    onError: (e: any) => {
      setStatus("");
      setImgsrc("");
      if (isExpire(e.response.status)) {
        alert("다시 로그인 해주세요");
        dispatch(logout());
        navigate("/");
        return;
      }
      alert("잠시후에 시도해주세요");
    },
  });
};

export default useUserBadgeStatus;
