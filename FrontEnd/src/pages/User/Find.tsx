import { useDispatch, useSelector } from "react-redux";
import MidButton from "../../components/Button/MidButton";
import Input from "../../components/Input/Input";
import FormLayout from "../../components/Layout/FormLayout";
import { setEmail, resetFind } from "../../stores/user/find";
import { RootState } from "../../stores/store";
import { useEffect, useState } from "react";
import { emailReg } from "../../utils/regex";
import useFindPwd from "../../apis/user/useFindPwd";
import BigButton from "../../components/Button/BigButton";
import { useNavigate } from "react-router-dom";

export default function Find() {
  const [emailWarning, setEmailWarning] = useState("");
  const { email } = useSelector((state: RootState) => state.find);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //이메일 아이디, 아이디, 이메일, 성공했을때
  //api
  const findpwdMutate = useFindPwd();

  useEffect(() => {
    dispatch(resetFind());
  }, []);

  //이메일 입력
  function onEmail(input: string) {
    if (!input.match(emailReg)) {
      setEmailWarning("이메일을 알맞게 작성해주세요.");
    } else {
      setEmailWarning("");
    }
    dispatch(setEmail(input));
  }

  //비밀번호 찾기
  function findPassword() {
    //이메일 유효성 확인
    if (email === "") {
      alert("이메일을 작성해주세요");
      return;
    } else if (!email.match(emailReg)) {
      return;
    }
    //이메일 전송
    findpwdMutate.mutate({ email: email });
  }
  return (
    <FormLayout>
      <div className="flex flex-col items-center h-full gap-24 text-white font-bold font-neob w-full">
        <div>
          <span className="mt-80 mb-40 block text-5xl font-bold text-white font-neob">비밀번호 찾기</span>
        </div>
        <div className="flex h-full flex-col w-4/5">
          <div>
            <div className="text-2xl font-bold">비밀번호 재 발급</div>
            <div className="block font-bold">
              <Input
                id="email"
                onChange={onEmail}
                type="input"
                value={email}
                warning={emailWarning}
                placeholder="이메일"
              ></Input>
            </div>
            <div className="flex justify-center">

            <button
              className="mt-120"
              onClick={findPassword}
            >
              <img
                className="h-120"
                src="./background/next.png"
                alt="로그인"
              />
            </button>
            </div>
          </div>
        </div>
      </div>
    </FormLayout>
  );
}
