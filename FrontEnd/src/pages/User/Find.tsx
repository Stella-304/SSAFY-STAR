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
      <div className="flex h-full flex-col justify-around">
        <div>
          <span className="block text-4xl font-bold">아이디/비밀번호 찾기</span>
        </div>
        <div className="flex h-full flex-col justify-around">
          <div>
            <div className="mb-10 text-2xl font-bold">비밀번호 재 발급</div>
            <div className="mb-8 block font-bold">
              <Input
                id="email"
                label="이메일"
                onChange={onEmail}
                type="input"
                value={email}
                warning={emailWarning}
              ></Input>
            </div>

            <div className="flex justify-end">
              <MidButton
                value="비밀번호 재발급"
                onClick={findPassword}
              ></MidButton>
            </div>
          </div>
          <div className="flex justify-center">
            <BigButton
              value="로그인 하러 가기"
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      </div>
    </FormLayout>
  );
}
