import BigButton from "../components/Button/BigButton";
import Input from "../components/Input/Input";
import EarthLayout from "../components/Layout/EarthLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";
import {
  setEmail,
  setPassword,
  setPassword2,
  setName,
} from "../stores/user/signup";
import { emailReg, passwordReg } from "../utils/regex";
import { useRef, useState } from "react";

export default function Signup() {
  const { email, name, password, password2 } = useSelector(
    (state: RootState) => state.signup
  );
  const dispatch = useDispatch();
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [password2Warning, setPassword2Warning] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  function onEmail(input: string) {
    if (!input.match(emailReg)) {
      setEmailWarning("이메일을 알맞게 작성해주세요.");
    } else {
      setEmailWarning("");
    }
    dispatch(setEmail(input));
  }
  function onPassword(input: string) {
    if (!input.match(passwordReg)) {
      setPasswordWarning(
        "알파벳 대소문자, 숫자, !@#$%^&* 포함 8글자 16글자 사이"
      );
    } else {
      setPasswordWarning("");
    }
    if (input !== password2) {
      setPassword2Warning("비밀번호가 일치하지 않습니다.");
    } else {
      setPassword2Warning("");
    }
    dispatch(setPassword(input));
  }
  function onPassword2(input: string) {
    if (input !== password) {
      setPassword2Warning("비밀번호가 일치하지 않습니다.");
    } else {
      setPassword2Warning("");
    }
    dispatch(setPassword2(input));
  }
  function onName(input: string) {
    dispatch(setName(input));
  }

  function submit() {
    //이름 확인
    if (name === "") {
      return nameRef?.current?.focus();
    }
    //이메일 확인
    if (!email.match(emailReg)) {
      return emailRef?.current?.focus();
    }
    //비밀번호 규칙 확인
    if (!password.match(passwordReg)) {
      return passwordRef?.current?.focus();
    }
    //비밀번호 동일 확인
    if (password !== password2) {
      return password2Ref?.current?.focus();
    }
    //회원가입 진행
    alert("가입완료");
  }
  return (
    <EarthLayout>
      <div className="flex flex-col justify-around h-full">
        <div>
          <span className="text-4xl block font-bold">Register</span>
          <span className="text-sm block">
            SsafyStar를 사용하기 위해 회원가입 해 주세요
          </span>
        </div>
        <div>
          <Input
            inputRef={nameRef}
            id="name"
            type="input"
            label="이름"
            onChange={onName}
            value={name}
          />
          <Input
            inputRef={emailRef}
            id="email"
            type="input"
            label="이메일"
            onChange={onEmail}
            value={email}
            warning={emailWarning}
          />
          <Input
            inputRef={passwordRef}
            id="password1"
            type="password"
            label="비밀번호"
            onChange={onPassword}
            value={password}
            warning={passwordWarning}
          />
          <Input
            inputRef={password2Ref}
            id="password2"
            type="password"
            label="비밀번호 확인"
            onChange={onPassword2}
            value={password2}
            warning={password2Warning}
          />
        </div>
        <div className="flex justify-center">
          <BigButton value="회원가입" onClick={submit} />
        </div>
      </div>
    </EarthLayout>
  );
}
