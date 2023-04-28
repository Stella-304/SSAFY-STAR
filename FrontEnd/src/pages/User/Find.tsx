import { useDispatch, useSelector } from "react-redux";
import MidButton from "../../components/Button/MidButton";
import Input from "../../components/Input/Input";
import EarthLayout from "../../components/Layout/EarthLayout";
import {
  setEmail2,
  setEmail,
  setLoginid,
  resetFind,
} from "../../stores/user/find";
import { RootState } from "../../stores/store";
import { useEffect, useState } from "react";
import { emailReg, loginidReg } from "../../utils/regex";

export default function Find() {
  const [idWarning, setIdWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [email2Warning, setEmail2Warning] = useState("");
  const { email, email2, loginid } = useSelector(
    (state: RootState) => state.find
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(resetFind());
  }, []);

  //아이디 입력
  function onId(input: string) {
    if (!input.match(loginidReg)) {
      setIdWarning("아이디는 10글자이내 영문+숫자로 해주세요.");
    } else {
      setIdWarning("");
    }
    dispatch(setLoginid(input));
  }

  //이메일 입력1
  function onEmail(input: string) {
    if (!input.match(emailReg)) {
      setEmailWarning("이메일을 알맞게 작성해주세요.");
    } else {
      setEmailWarning("");
    }
    dispatch(setEmail(input));
  }

  //이메일 입력2
  function onEmail2(input: string) {
    if (!input.match(emailReg)) {
      setEmail2Warning("이메일을 알맞게 작성해주세요.");
    } else {
      setEmail2Warning("");
    }
    dispatch(setEmail2(input));
  }

  //아이디 찾기
  function findLoginId() {}

  //비밀번호 찾기
  function findPassword() {}
  return (
    <EarthLayout>
      <div className="flex flex-col justify-around h-full">
        <div>
          <span className="text-4xl block font-bold">아이디/비밀번호 찾기</span>
        </div>
        <div className="h-full flex flex-col justify-around">
          <div>
            <div className="text-2xl font-bold">아이디 찾기</div>
            <div className="mb-8">
              <Input
                id="email1"
                label="이메일"
                onChange={onEmail}
                type="input"
                value={email}
                warning={emailWarning}
              ></Input>
            </div>
            <div className="flex justify-end">
              <MidButton value="아이디찾기" onClick={findLoginId}></MidButton>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">비밀번호 재 발급</div>
            <div className="mb-8">
              <Input
                id="email2"
                label="이메일"
                onChange={onEmail2}
                type="input"
                value={email2}
                warning={email2Warning}
              ></Input>

              <Input
                id="loginid"
                label="아이디"
                onChange={onId}
                type="input"
                value={loginid}
                warning={idWarning}
              ></Input>
            </div>

            <div className="flex justify-end">
              <MidButton
                value="비밀번호 재발급"
                onClick={findPassword}
              ></MidButton>
            </div>
          </div>
        </div>
      </div>
    </EarthLayout>
  );
}
