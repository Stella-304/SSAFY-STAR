import { useMutation } from "react-query";
import { USER_PWD_MODY_URL } from "../../utils/urls";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
const fetcher = (pwd:string) =>
  api
    .put(USER_PWD_MODY_URL,{},{
      params:{
        newPwd:pwd
      },
      headers:{Authorization:sessionStorage.getItem("accessToken")}
    })
    .then(({ data }) => data);

/**
 * 유저의 정보를 수정 - 비밀번호
 * @returns 
 */
const useUserPwdModify = () => {
  const navigate = useNavigate();
  return useMutation(fetcher, {onSuccess:()=>{
    alert("수정완료");
    navigate("/mypage");
  }});
};

export default useUserPwdModify;
