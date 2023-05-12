import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input/Input";
import FormLayout from "../../components/Layout/FormLayout";
import { setEmail, resetFind } from "../../stores/user/find";
import { RootState } from "../../stores/store";
import { useEffect, useState } from "react";
import { emailReg } from "../../utils/regex";
import useFindPwd from "../../apis/user/useFindPwd";
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
      <div className="flex h-full w-full flex-col items-center gap-24 font-neob font-bold text-white">
        <div>
          <span className="mb-40 mt-80 block font-neob text-4xl font-bold text-white">
            비밀번호 찾기
          </span>
        </div>
        <div className="flex h-full w-4/5 flex-col">
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
              <button className="mt-80" onClick={findPassword}>
                <img
                  className="h-120"
                  src="./background/next.png"
                  alt="전송하기"
                />
              </button>
            </div>
            <div className="flex justify-center">
              <button
                className="mt-48 flex justify-center font-neo text-16 text-white"
                onClick={() => navigate("/login")}
              >
                로그인 하러 가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </FormLayout>
  );
}
