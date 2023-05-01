import BigButton from "../../components/Button/BigButton";
import Input from "../../components/Input/Input";
import EarthLayout from "../../components/Layout/EarthLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { setUser, resetUser } from "../../stores/user/signup";
import { emailReg, loginidReg, nameReg, passwordReg } from "../../utils/regex";
import { useEffect, useMemo, useRef, useState } from "react";
import SmallButton from "../../components/Button/SmallButton";
import { sec2time } from "../../utils/util";
import useSignup from "../../apis/user/useSignup";
import { SignupType } from "../../types/SignupType";
import useEmailCheck from "../../apis/user/useEmailCheck";
import useSendMail from "../../apis/user/useSendMail";
import useSendMailCheck from "../../apis/user/useSendMailCheck";

export default function Signup() {
  const { user } = useSelector((state: RootState) => state.signup);
  const dispatch = useDispatch();
  const [idWarning, setIdWarning] = useState("");
  const [nameWarning, setNameWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [password2Warning, setPassword2Warning] = useState("");

  const [codeWarning, setCodeWarning] = useState("");
  const [codeConfirm, setCodeConfirm] = useState("");

  const [emailCheckCode, setEmailCheckCode] = useState(""); //이메일 체크코드
  const [openCheck, setOpenCheck] = useState(false); //이메일 인증칸 오픈
  const [emailCheck, setEmailCheck] = useState(false); //이메일 체크유무
  const [timer, setTimer] = useState(-1); //3분 타이머

  const idRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  //회원가입 요청
  const signupMutate = useSignup();

  //이메일 중복 확인
  const [emailCheckSave, setEmailCheckSave] = useState("");
  const emailCheckQeury = useEmailCheck(emailCheckSave);
  //이메일 인증 전송
  const sendEmailMutate = useSendMail();
  const sendEmailCheckMutate = useSendMailCheck({
    setTimer,
    setCodeConfirm,
    setCodeWarning,
    setEmailCheck,
  });

  useMemo(() => {
    if (emailCheckSave === "") return;
    if (emailCheckQeury.isLoading || emailCheckQeury.error) return null;

    if (emailCheckQeury.data !== undefined) {
      if (emailCheckQeury.data.status === "CONFLICT") {
        //중복
        setEmailWarning(emailCheckQeury.data.message);
      } else {
        //사용가능 이메일
        setTimer(60 * 3); //3분 타이머 시작

        //메일 전송
        sendEmailMutate.mutate({ email: user.email });
        setOpenCheck(true);
      }
    }
  }, [emailCheckQeury.isLoading, emailCheckQeury.error, emailCheckQeury.data]);

  useEffect(() => {
    dispatch(resetUser());
  }, []);

  useEffect(() => {
    const timeId = setInterval(() => {
      if (timer === -1) {
        clearInterval(timeId);
        return;
      }
      if (timer === 0) {
        setCodeWarning("다시 인증 해주세요");
        clearInterval(timeId);
        return;
      }
      setCodeWarning(sec2time(timer));
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(timeId);
  }, [timer]);

  //아이디 입력
  function onId(input: string) {
    if (!input.match(loginidReg)) {
      setIdWarning("아이디는 16글자이내 영문+숫자로 해주세요.");
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
    if (!input.match(nameReg)) {
      setNameWarning("이름은 5글자 이내로 해주세요");
    } else {
      //이메일 중복 확인요청
      setNameWarning("");
    }
    dispatch(setUser({ ...user, name: input }));
  }

  //이메일 인증
  function sendEmail() {
    //이메일 인증 날리기
    if (!user.email.match(emailReg)) {
      setEmailWarning("이메일을 알맞게 작성해주세요.");
      return;
    } else {
      //이메일 중복 확인요청
      setEmailCheckSave(user.email);
    }
  }

  //이메일 인증 번호확인
  function checkEmail() {
    //인증번호 일치 확인
    //일치 setEmailCheck(true);
    //불일치 setEmailCheck(false);
    if (timer <= 0) {
      setCodeWarning("다시 인증 해주세요");
      return;
    }

    sendEmailCheckMutate.mutate({ code: emailCheckCode });
  }

  //회원가입 진행
  function submit() {
    //이름 확인
    if (user.name === "") {
      return;
    }

    if (!user.name.match(nameReg)) {
      return nameRef?.current?.focus();
    }

    //이메일 확인
    if (!user.email.match(emailReg)) {
      return emailRef?.current?.focus();
    }
    //이메일 인증 여부
    if (!emailCheck) {
      alert("인증을 완료해주세요");
      return;
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
    const payload: SignupType = {
      userId: user.loginid,
      userPwd: user.password,
      nickname: user.name,
      email: user.email,
    };
    signupMutate.mutate(payload);
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
            label="닉네임"
            onChange={onName}
            value={user?.name}
            warning={nameWarning}
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
              <SmallButton value="중복확인" onClick={sendEmail}></SmallButton>
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
