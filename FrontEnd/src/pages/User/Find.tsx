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
import useEmailFindCheck from "../../apis/user/useEmailFindCheck";
import useFindId from "../../apis/user/useFindId";

export default function Find() {
  const [idWarning, setIdWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [email2Warning, setEmail2Warning] = useState("");
  const { email, email2, loginid } = useSelector(
    (state: RootState) => state.find,
  );

  const dispatch = useDispatch();

  //이메일 아이디, 아이디, 이메일, 성공했을때
  //api
  const findidQuery = useFindId(email);
  const emailfindcheckQuery = useEmailFindCheck(email2, loginid);

  useEffect(() => {
    dispatch(resetFind());
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
  function findLoginId() {
    //이메일 유효성 확인
    if (email === "") {
      alert("이메일을 작성해주세요");
      return;
    }
    if (!email.match(emailReg)) {
      return;
    }
    findidQuery.refetch();
    //전송
    //연속으로 전송 안되게 막기
  }

  //비밀번호 찾기
  function findPassword() {
    //이메일 유효성 확인
    if (email2 === "") {
      alert("이메일을 작성해주세요");
      return;
    }
    if (!email2.match(emailReg)) {
      return;
    }
    //아이디 유효성 확인
    if (loginid === "") {
      alert("아이디를 작성해주세요");
      return;
    }
    //이메일 전송
    emailfindcheckQuery.refetch();
    //연속 안되게 막기
  }
  return (
    <EarthLayout>
      <div className="flex h-full flex-col justify-around">
        <div>
          <span className="block text-4xl font-bold">아이디/비밀번호 찾기</span>
        </div>
        <div className="flex h-full flex-col justify-around">
          <div>
            <div className="mb-10 text-2xl font-bold">아이디 찾기</div>
            <div className="mb-8 block font-bold">
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
            <div className="mb-10 text-2xl font-bold">비밀번호 재 발급</div>
            <div className="mb-8 block font-bold">
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
