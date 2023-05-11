import BigButton from "../../components/Button/BigButton";
import Input from "../../components/Input/Input";
import FormLayout from "../../components/Layout/FormLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { setUser, resetUser } from "../../stores/user/signup";
import { emailReg, passwordReg } from "../../utils/regex";
import { useEffect, useRef, useState } from "react";
import SmallButton from "../../components/Button/SmallButton";
import { sec2time } from "../../utils/util";
import useSignup from "../../apis/user/useSignup";
import { SignupType } from "../../types/SignupType";
import useEmailCheck from "../../apis/user/useEmailCheck";
import useSendMailCheck from "../../apis/user/useSendMailCheck";
import { setPath } from "../../stores/page/path";

export default function Signup() {
  const { user } = useSelector((state: RootState) => state.signup);
  const dispatch = useDispatch();

  //이메일 체크
  const [emailCheckCode, setEmailCheckCode] = useState(""); //이메일 체크코드
  const [openCheck, setOpenCheck] = useState(false); //이메일 인증칸 오픈
  const [emailCheck, setEmailCheck] = useState(false); //이메일 체크유무
  const [timer, setTimer] = useState(-1); //3분 타이머
  const [emailCheckSave, setEmailCheckSave] = useState("");

  //경고
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [password2Warning, setPassword2Warning] = useState("");
  const [codeWarning, setCodeWarning] = useState("");
  const [codeConfirm, setCodeConfirm] = useState("");

  //포커스용
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  //회원가입 요청
  const signupMutate = useSignup(user.email, user.password);

  //이메일 중복 확인
  const emailCheckQeury = useEmailCheck(user.email, setTimer, setOpenCheck);
  //이메일 인증 전송
  const sendEmailCheckMutate = useSendMailCheck({
    setTimer,
    setCodeConfirm,
    setCodeWarning,
    setEmailCheck,
  });

  useEffect(() => {
    dispatch(resetUser());
    dispatch(setPath("signup")); //현 위치 표시
    return () => {
      dispatch(setPath("")); //나갈땐 리셋
    };
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

  //이메일 입력
  function onEmail(input: string) {
    if (!input.match(emailReg)) {
      setEmailWarning("이메일을 알맞게 작성해주세요.");
    } else {
      setEmailWarning("");
    }
    setOpenCheck(false);
    dispatch(setUser({ ...user, email: input }));
  }

  //비밀번호 입력
  function onPassword(input: string) {
    if (!input.match(passwordReg)) {
      setPasswordWarning(
        //8~16자 사이 대문자, 특수문자 한개씩 필수 포함 가능한 특수문자 목록 '!', '@', '?', '#'
        "영문 포함 8글자 16글자 사이(특수문자는 # @ ! ? 만 가능)",
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

  //이메일 인증
  function sendEmail() {
    //이메일 확인
    if (!user.email.match(emailReg)) {
      return emailRef?.current?.focus();
    }
    //비밀번호 규칙 확인
    if (!user.password.match(passwordReg)) {
      return passwordRef?.current?.focus();
    }
    //비밀번호 동일 확인
    if (user.password !== user.password2) {
      return password2Ref?.current?.focus();
    }
    //이메일 인증 날리기
    if (!user.email.match(emailReg)) {
      setEmailWarning("이메일을 알맞게 작성해주세요.");
      return;
    } else {
      //이메일 중복 확인요청
      setEmailCheckSave(user.email);
      emailCheckQeury.refetch();
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

    sendEmailCheckMutate.mutate({
      email: emailCheckSave,
      code: emailCheckCode,
    });
  }

  //회원가입 진행
  function submit() {
    //이메일 인증 여부
    if (!emailCheck) {
      alert("인증을 완료해주세요");
      return;
    }
    //회원가입 진행
    const payload: SignupType = {
      userPwd: user.password,
      name: user.name,
      email: user.email,
    };
    signupMutate.mutate(payload);
  }
  return (
    <FormLayout>
      <div className="flex h-full flex-col items-center gap-24 font-bold text-white">
        <div>
          <span className="mb-20 mt-60 block font-neob text-4xl font-bold">
            회원가입
          </span>
        </div>
        {!openCheck && (
          <div className="w-4/5">
            <div className="flex">
              <div className="w-full">
                <Input
                  inputRef={emailRef}
                  id="email"
                  type="input"
                  onChange={onEmail}
                  value={user?.email}
                  warning={emailWarning}
                  disable={emailCheck}
                  placeholder="이메일"
                />
              </div>
            </div>

            <Input
              inputRef={passwordRef}
              id="password1"
              type="password"
              onChange={onPassword}
              value={user?.password}
              warning={passwordWarning}
              placeholder="비밀번호"
            />
            <Input
              inputRef={password2Ref}
              id="password2"
              type="password"
              onChange={onPassword2}
              value={user?.password2}
              warning={password2Warning}
              placeholder="비밀번호 확인"
            />
          </div>
        )}
        {openCheck && (
          <div className="w-4/5">
            <div className="flex w-full flex-col">
              <div className="w-full">
                <Input
                  id="email_check"
                  type="input"
                  onChange={(code) => setEmailCheckCode(code)}
                  warning={codeWarning}
                  confirm={codeConfirm}
                  disable={emailCheck}
                  placeholder="인증코드"
                />
              </div>
              {emailCheck ? (
                <></>
              ) : (
                <button
                  className="mt-48 flex justify-center"
                  onClick={checkEmail}
                >
                  <img
                    className="h-120"
                    src="./background/next.png"
                    alt="인증"
                  />
                </button>
              )}
            </div>
          </div>
        )}
        <div>
          <div className="flex justify-center">
            {openCheck ? (
              emailCheck ? (
                <button className="mt-48 flex justify-center" onClick={submit}>
                  <img
                    className="h-120"
                    src="./background/next.png"
                    alt="인증"
                  />
                </button>
              ) : (
                <button
                  className="mt-48 flex justify-center font-neo text-16 text-white"
                  onClick={() => setOpenCheck(false)}
                >
                  이전으로
                </button>
              )
            ) : (
              <button className="mt-48 flex justify-center" onClick={sendEmail}>
                <img
                  className="h-120"
                  src="./background/next.png"
                  alt="로그인"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </FormLayout>
  );
}
