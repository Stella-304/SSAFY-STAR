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
import { seededRandom } from "three/src/math/MathUtils";

export default function Signup() {
  const { email, name, password, password2 } = useSelector(
    (state: RootState) => state.signup
  );
  const dispatch = useDispatch();

  function onEmail(input: string) {
    dispatch(setEmail(input));
  }
  function onPassword(input: string) {
    dispatch(setPassword(input));
  }
  function onPassword2(input: string) {
    dispatch(setPassword2(input));
  }
  function onName(input: string) {
    dispatch(setName(input));
  }

  function submit() {
    // 회원가입 진행
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
            id="name"
            type="input"
            label="이름"
            onChange={onName}
            value={name}
          />
          <Input
            id="email"
            type="input"
            label="이메일"
            onChange={onEmail}
            value={email}
          />
          <Input
            id="password1"
            type="password"
            label="비밀번호"
            onChange={onPassword}
            value={password}
          />
          <Input
            id="password2"
            type="password"
            label="비밀번호 확인"
            onChange={onPassword2}
            value={password2}
          />
        </div>
        <div className="flex justify-center">
          <BigButton value="회원가입" onClick={submit} />
        </div>
      </div>
    </EarthLayout>
  );
}
