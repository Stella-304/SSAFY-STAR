import { useQuery } from "react-query";
import { USER_DETAIL_URL } from "../../utils/urls";
import { api } from "../api";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../../stores/user/user";
import { useNavigate } from "react-router-dom";
import { isExpire } from "../error/isExpire";

const fetcher = () =>
  api
    .get(USER_DETAIL_URL, {
      headers: { Authorization: sessionStorage.getItem("accessToken") },
    })
    .then(({ data }) => data);

/**
 * 유저의 세부정보를 가져온다.
 * - 이름, 닉네임, 이메일, 카드등록여부
 * @returns
 */
const useUserDetailUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useQuery("/userdetail", fetcher, {
    retry: 0,
    enabled: false,
    onSuccess: (data) => {
      dispatch(
        setUser({
          email: data.value.email ? data.value.email : "",
          name: data.value.name ? data.value.name : "",
          nickname: data.value.nickname ? data.value.nickname : "",
          cardRegistered: data.value.cardRegistered,
        }),
      );
    },
    onError: (e: any) => {
      if (isExpire(e.response.status)) {
        alert("다시 로그인 해주세요");
        dispatch(logout());
        navigate("/");
        return;
      }
      alert("잠시후 다시 시도해 주세요.");
    },
  });
};

export default useUserDetailUpdate;
