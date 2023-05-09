import { useMutation } from "react-query";
import { api } from "../api";
import { ADMIN_ACCEPT } from "../../utils/urls";

const fetcher = (payload: { authid: string; type: string }) =>
  api
    .post(
      ADMIN_ACCEPT + "/" + payload.authid + "/" + payload.type,
      {},
      {
        headers: { Authorization: sessionStorage.getItem("accessToken") },
      },
    )
    .then(({ data }) => data);

const useAdminAccept = () => {
  return useMutation(fetcher, {
    retry: 0,
    onSuccess: () => {},
    onError: () => {},
  });
};

export default useAdminAccept;
