import BigButton from "../../components/Button/BigButton";
import LinkButton from "../../components/Button/LinkButton";
import MidButton from "../../components/Button/MidButton";
import Input from "../../components/Input/Input";
import EarthLayout from "../../components/Layout/EarthLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { setEmail, setPassword } from "../../stores/user/login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { email, password } = useSelector((state: RootState) => state.login);
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function onEmail(input: string) {
    dispatch(setEmail(input));
  }
  function onPassword(input: string) {
    dispatch(setPassword(input));
  }

  function submit() {
    // 로그인 진행
    if (email === "") {
      setEmailWarning("이메일을 입력해주세요");
      return;
    } else {
      setEmailWarning("");
    }

    if (password === "") {
      setPasswordWarning("비밀번호를 입력해주세요");
      return;
    } else {
      setPasswordWarning("");
    }
  }
  return (
    <EarthLayout>
      <div className="flex flex-col justify-around h-full">
        <div>
          <span className="text-4xl block font-bold">Login</span>
          <span className="text-sm block">
            SsafyStar를 사용하기 위해 로그인 해 주세요
          </span>
        </div>
        <div className="mb-80">
          <Input
            id="email"
            type="input"
            label="이메일"
            onChange={onEmail}
            value={email}
            warning={emailWarning}
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
          <div className="flex justify-center gap-16">
            <MidButton type="outline" value="구글 로그인" />
            <MidButton type="outline" value="kakao 로그인" />
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
