import { useQuery } from "react-query";
import { api } from "../api";
import { ADMIN_YET } from "../../utils/urls";

const fetcher = () =>
  api.get(ADMIN_YET, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);


const useAdminYet = (setBadgeList:(params:any)=>void) => {
  return useQuery("/adminyet", fetcher, {
    enabled: false,
    retry: 0,
    onSuccess:(data)=>{
      setBadgeList(data.value.badgeDtoList)
    }
  });
};

export default useAdminYet;
