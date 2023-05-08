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
import { setPath } from "../../stores/page/path";

export default function Login() {
  const { loginid, password } = useSelector((state: RootState) => state.login);
  const [idWarning, setIdWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const loginMutate = useLogin();
  useEffect(() => {
    dispatch(resetLogin());//로그인 했던 정보 리셋
    dispatch(setPath("login"));//현 위치 표시
    return () => {
      dispatch(setPath(""));//나갈땐 리셋
    };
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
  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      submit(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
  return (
    <EarthLayout>
      <div
        className="flex h-full flex-col justify-around"
        onKeyDown={handleOnKeyPress}
      >
        <div>
          <span className="mb-14 block text-4xl font-bold">LOG-IN</span>
          <span className="block text-sm font-bold">
            SSAFY STAR를 사용하기 위해 로그인 해 주세요👀
          </span>
        </div>
        <div className=" block font-bold">
          <Input
            id="loginId"
            type="textfield"
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

          <div className="flex flex-col py-10 text-right">
            <LinkButton onClick={() => navigate("/idpwfind")}>
              로그인이 안 되시나요?
            </LinkButton>
          </div>
          <div className="mt-30 flex h-48 justify-center font-bold">
            <MidButton value="로그인" onClick={submit} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* oauth */}
          {/* <div className="flex justify-center gap-16"> */}
          {/* <MidButton value="구글 로그인" onClick={() => goOauth("google")} /> */}
          {/* <MidButton value="네이버 로그인" onClick={() => goOauth("naver")} /> */}
          {/* <MidButton value="kakao 로그인" onClick={() => goOauth("kakao")} /> */}

          <div className="flex flex-col items-center">
            {/*
            <button
              className="flex justify-center"
              onClick={() => goOauth("google")}
            >
              <img
                className="h-48"
                src="./background/login_google.png"
                alt="google 로그인"
              />
            </button>
             <button
              className="flex justify-center"
              onClick={() => goOauth("kakao")}
            >
              <img
                className="h-48"
                src="./background/login_kakao.png"
                alt="kakao 로그인"
              />
            </button> */}
          </div>
          {/* </div> */}
          <div className="mb-14 py-10 text-right font-bold">
            <LinkButton onClick={() => navigate("/signup")}>
              계정 생성하기
            </LinkButton>
          </div>
        </div>
      </div>
    </EarthLayout>
  );
}
