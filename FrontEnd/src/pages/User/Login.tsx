import BigButton from "../../components/Button/BigButton";
import LinkButton from "../../components/Button/LinkButton";
import MidButton from "../../components/Button/MidButton";
import Input from "../../components/Input/Input";
import EarthLayout from "../../components/Layout/EarthLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { setLoginid, setPassword, resetLogin } from "../../stores/user/login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import goOauth from "../../apis/user/oAuth";
import { loginidReg } from "../../utils/regex";
import { LoginType } from "../../types/LoginType";
import useLogin from "../../apis/user/useLogin";

export default function Login() {
  const { loginid, password } = useSelector((state: RootState) => state.login);
  const [idWarning, setIdWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const loginMutate = useLogin();
  useEffect(() => {
    dispatch(resetLogin());
  }, []);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function onLoginid(input: string) {
    dispatch(setLoginid(input));
  }
  function onPassword(input: string) {
    dispatch(setPassword(input));
  }

  function submit() {
    // 로그인 진행
    if (loginid === "") {
      setIdWarning("아이디를 입력해주세요");
      return;
    } else {
      //아이디 확인
      if (!loginid.match(loginidReg)) {
        setIdWarning("아이디 형식을 맞춰주세요");
        return;
      }
      setIdWarning("");
    }

    if (password === "") {
      setPasswordWarning("비밀번호를 입력해주세요");
      return;
    } else {
      setPasswordWarning("");
    }

    const payload: LoginType = {
      accountId: loginid,
      accountPwd: password,
    };
    loginMutate.mutate(payload);
  }
  return (
    <EarthLayout>
      <div className="flex h-full flex-col justify-around">
        <div>
          <span className="block text-4xl font-bold">Login</span>
          <span className="block text-sm">
            SsafyStar를 사용하기 위해 로그인 해 주세요
          </span>
        </div>
        <div className="mb-80">
          <Input
            id="loginId"
            type="input"
            label="아이디"
            onChange={onLoginid}
            value={loginid}
            warning={idWarning}
          />
          <Input
            id="password"
            type="password"
            label="비밀번호"
            onChange={onPassword}
            value={password}
            warning={passwordWarning}
          />
          <div className="flex flex-col text-right">
            <LinkButton onClick={() => navigate("/idpwfind")}>
              아이디/비밀번호 찾기
            </LinkButton>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* oauth */}
          <div className="flex flex-col justify-center gap-16">
            <MidButton value="구글 로그인" onClick={() => goOauth("google")} />
            {/* <MidButton value="네이버 로그인" onClick={() => goOauth("naver")} /> */}
            <MidButton value="kakao 로그인" onClick={() => goOauth("kakao")} />
          </div>
          <div className="flex justify-center">
            <BigButton value="로그인" onClick={submit} />
          </div>
          <div className="text-right">
            <LinkButton onClick={() => navigate("/signup")}>
              회원정보가 없으신가요? Register Herer
            </LinkButton>
          </div>
        </div>
      </div>
    </EarthLayout>
  );
}
