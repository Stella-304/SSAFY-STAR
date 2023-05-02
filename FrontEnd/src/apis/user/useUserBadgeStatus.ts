import { useQuery } from "react-query";
import axios from "axios";
import { BADGE_STATUS_URL } from "../../utils/urls";

const fetcher = (type: string) =>
  axios
    .get(BADGE_STATUS_URL + "/" + type, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then(({ data }) => data);

const useUserBadgeStatus = (type: string) => {
  return useQuery(["/userbadgestatus", type], () => fetcher(type), {
    enabled: false,
    onSuccess: () => {},
    onError: () => {},
  });
};

export default useUserBadgeStatus;
