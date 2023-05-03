import { useQuery } from "react-query";
import { api } from "../api";
import { ADMIN_ALL } from "../../utils/urls";

const fetcher = () =>
  api.get(ADMIN_ALL, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);


const useAdminAll = (setBadgeList:(params:any)=>void) => {
  return useQuery("/adminall", fetcher, {
    enabled: false,
    retry: 0,
    onSuccess:(data)=>{
      setBadgeList(data.value.badgeDtoList)
    }
  });
};

export default useAdminAll;
