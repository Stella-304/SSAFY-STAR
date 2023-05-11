import LinkButton from "../../components/Button/LinkButton";
import MidButton from "../../components/Button/MidButton";
import Input from "../../components/Input/Input";
import FormLayout from "../../components/Layout/FormLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { setLoginid, setPassword, resetLogin } from "../../stores/user/login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import goOauth from "../../apis/user/oAuth";
import { emailReg } from "../../utils/regex";
import { LoginType } from "../../types/LoginType";
import useLogin from "../../apis/user/useLogin";
import { setPath } from "../../stores/page/path";

export default function Login() {
  const { loginid, password } = useSelector((state: RootState) => state.login);
  const [idWarning, setIdWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const loginMutate = useLogin();
  useEffect(() => {
    dispatch(resetLogin()); //로그인 했던 정보 리셋
    dispatch(setPath("login")); //현 위치 표시
    return () => {
      dispatch(setPath("")); //나갈땐 리셋
    };
  }, []);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function onLoginid(input: string) {
    if (!input.match(emailReg)) {
      setIdWarning("이메일 형식을 맞춰주세요");
    } else {
      setIdWarning("");
    }
    dispatch(setLoginid(input));
  }
  function onPassword(input: string) {
    dispatch(setPassword(input));
  }

  function submit() {
    // 로그인 진행
    if (loginid === "") {
      setIdWarning("이메일을 입력해주세요");
      return;
    } else {
      //아이디 확인
      if (!loginid.match(emailReg)) {
        setIdWarning("이메일 형식을 맞춰주세요");
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
      email: loginid,
      accountPwd: password,
    };
    loginMutate.mutate(payload);
  }
  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      submit(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
  return (
    <FormLayout>
      <div
        className="flex h-full flex-col items-center gap-24"
        onKeyDown={handleOnKeyPress}
      >
        <div>
          <span className="mb-20 mt-60 block font-neob text-4xl font-bold text-white">
            로그인
          </span>
        </div>
        <div className="block w-4/5 font-bold">
          <Input
            id="loginId"
            type="textfield"
            onChange={onLoginid}
            value={loginid}
            placeholder="이메일"
          />
          <Input
            id="password"
            type="password"
            onChange={onPassword}
            value={password}
            // warning={passwordWarning}
            placeholder="비밀번호"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center gap-24">
            <button
              className="flex justify-center"
              onClick={() => goOauth("google")}
            >
              <img
                className="h-60"
                src="./background/login_google_2.png"
                alt="google 로그인"
              />
            </button>
            <button
              className="flex justify-center"
              onClick={() => goOauth("kakao")}
            >
              <img
                className="h-60"
                src="./background/login_kakao_2.png"
                alt="kakao 로그인"
              />
            </button>
          </div>
          <button className="mt-48 flex justify-center" onClick={submit}>
            <img className="h-120" src="./background/next.png" alt="로그인" />
          </button>

          <div className="flex flex-col py-5 font-neob font-bold">
            <LinkButton onClick={() => navigate("/idpwfind")}>
              로그인이 안 되시나요?
            </LinkButton>
          </div>
          <div className="mb-14 py-10 font-neob font-bold">
            <LinkButton onClick={() => navigate("/signup")}>
              계정 생성하기
            </LinkButton>
          </div>
        </div>
      </div>
    </FormLayout>
  );
}
