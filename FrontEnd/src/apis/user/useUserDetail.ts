import { useQuery } from "react-query";
import { USER_DETAIL_URL } from "../../utils/urls";
import { api } from "../api";
import { useDispatch } from "react-redux";
import { setUser } from "../../stores/user/user";
import { useNavigate } from "react-router-dom";

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
const useUserDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useQuery("/userdetail", fetcher, {
    retry: 0,
    enabled: false,
    onSuccess: (data) => {
      // alert(data.value.email);
      dispatch(
        setUser({
          email: data.value.email,
          name: data.value.name,
          nickname: data.value.nickname,
          cardRegistered: data.value.cardRegistered,
        }),
      );
      navigate("/"); //메인으로 이동
    },
    onError: () => {
      // alert("뭐지");
      // alert("토큰이 확인이 안됩니다.");
      navigate("/login");
    },
  });
};

export default useUserDetail;
