import BigButton from "../../components/Button/BigButton";
import Input from "../../components/Input/Input";
import EarthLayout from "../../components/Layout/EarthLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { setUser, resetUser } from "../../stores/user/signup";
import { emailReg, loginidReg, passwordReg } from "../../utils/regex";
import { useEffect, useRef, useState } from "react";
import SmallButton from "../../components/Button/SmallButton";

export default function Signup() {
  const { user } = useSelector((state: RootState) => state.signup);
  const dispatch = useDispatch();
  const [idWarning, setIdWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [password2Warning, setPassword2Warning] = useState("");

  const [codeWarning, setCodeWarning] = useState("");
  const [codeConfirm, setCodeConfirm] = useState("");

  const [emailCheckCode, setEmailCheckCode] = useState(""); //이메일 체크코드
  const [openCheck, setOpenCheck] = useState(false); //이메일 인증칸 오픈
  const [emailCheck, setEmailCheck] = useState(false); //이메일 체크유무

  const idRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(resetUser());
  }, []);

  //아이디 입력
  function onId(input: string) {
    if (!input.match(loginidReg)) {
      setIdWarning("아이디는 10글자이내 영문+숫자로 해주세요.");
    } else {
      setIdWarning("");
    }
    dispatch(setUser({ ...user, loginid: input }));
  }

  //이메일 입력
  function onEmail(input: string) {
    if (!input.match(emailReg)) {
      setEmailWarning("이메일을 알맞게 작성해주세요.");
    } else {
      setEmailWarning("");
    }
    dispatch(setUser({ ...user, email: input }));
  }

  //비밀번호 입력
  function onPassword(input: string) {
    if (!input.match(passwordReg)) {
      setPasswordWarning(
        //8~16자 사이 대문자, 특수문자 한개씩 필수 포함 가능한 특수문자 목록 '!', '@', '?', '#'
        "알파벳 대소문자, 숫자, !@?# 포함 8글자 16글자 사이"
      );
    } else {
      setPasswordWarning("");
    }
    if (input !== user.password2) {
      setPassword2Warning("비밀번호가 일치하지 않습니다.");
    } else {
      setPassword2Warning("");
    }
    dispatch(setUser({ ...user, password: input }));
  }

  //비밀번호 확인
  function onPassword2(input: string) {
    if (input !== user.password) {
      setPassword2Warning("비밀번호가 일치하지 않습니다.");
    } else {
      setPassword2Warning("");
    }
    dispatch(setUser({ ...user, password2: input }));
  }

  //이름 입력
  function onName(input: string) {
    dispatch(setUser({ ...user, name: input }));
  }

  //이메일 인증
  function sendEmail() {
    //이메일 인증 날리기
    setOpenCheck(true);
  }

  //이메일 인증 번호확인
  function checkEmail() {
    //인증번호 일치 확인
    //일치 setEmailCheck(true);
    //불일치 setEmailCheck(false);

    if (emailCheckCode === "test") {
      setCodeWarning("");
      setCodeConfirm("인증완료");
      setEmailCheck(true);
    } else {
      setCodeWarning("인증번호를 확인해주세요.");
    }
  }

  //회원가입 진행
  function submit() {
    //이름 확인
    if (user.name === "") {
      return nameRef?.current?.focus();
    }
    //이메일 확인
    if (!user.email.match(emailReg)) {
      return emailRef?.current?.focus();
    }
    //아이디 확인
    if (!user.loginid.match(loginidReg)) {
      return idRef?.current?.focus();
    }
    //비밀번호 규칙 확인
    if (!user.password.match(passwordReg)) {
      return passwordRef?.current?.focus();
    }
    //비밀번호 동일 확인
    if (user.password !== user.password2) {
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
            inputRef={idRef}
            id="loginid"
            type="input"
            label="아이디"
            onChange={onId}
            value={user?.loginid}
            warning={idWarning}
          />
          <Input
            inputRef={nameRef}
            id="name"
            type="input"
            label="이름"
            onChange={onName}
            value={user?.name}
          />
          <div className="flex">
            <div className="flex-grow">
              <Input
                inputRef={emailRef}
                id="email"
                type="input"
                label="이메일"
                onChange={onEmail}
                value={user?.email}
                warning={emailWarning}
                disable={emailCheck}
              />
            </div>
            <div className="flex items-end">
              <SmallButton value="인증" onClick={sendEmail}></SmallButton>
            </div>
          </div>
          {openCheck && (
            <div className="flex">
              <div className="flex-grow">
                <Input
                  id="email_check"
                  type="input"
                  label="인증코드 입력"
                  onChange={(code) => setEmailCheckCode(code)}
                  warning={codeWarning}
                  confirm={codeConfirm}
                  disable={emailCheck}
                />
              </div>
              <div className="flex items-end">
                <SmallButton value="인증" onClick={checkEmail}></SmallButton>
              </div>
            </div>
          )}

          <Input
            inputRef={passwordRef}
            id="password1"
            type="password"
            label="비밀번호"
            onChange={onPassword}
            value={user?.password}
            warning={passwordWarning}
          />
          <Input
            inputRef={password2Ref}
            id="password2"
            type="password"
            label="비밀번호 확인"
            onChange={onPassword2}
            value={user?.password2}
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
