import { useMutation } from "react-query";
import { USER_URL } from "../../utils/urls";
import { api } from "../api";
import { UserModifyType } from "../../types/UserModifyType";
import { useNavigate } from "react-router-dom";
const fetcher = (payload:UserModifyType) =>
  api
    .put(USER_URL,payload,{headers:{Authorization:sessionStorage.getItem("accessToken")}})
    .then(({ data }) => data);

/**
 * 유저의 정보를 수정 - 이름, 닉네임
 * @returns 
 */
const useUserModify = () => {
  const navigate = useNavigate();
  return useMutation(fetcher, {onSuccess:()=>{
    alert("수정완료");
    navigate("/mypage");
  }});
};

export default useUserModify;
