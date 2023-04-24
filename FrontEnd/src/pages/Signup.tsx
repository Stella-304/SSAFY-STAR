import BigButton from "../components/Button/BigButton";
import Input from "../components/Input/Input";
import EarthLayout from "../components/Layout/EarthLayout";

export default function Signup() {
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
          <Input id="name" type="input" label="이름" />
          <Input id="email" type="input" label="이메일" />
          <Input id="password1" type="password" label="비밀번호" />
          <Input id="password2" type="password" label="비밀번호 확인" />
        </div>
        <div className="flex justify-center">
          <BigButton value="회원가입" />
        </div>
      </div>
    </EarthLayout>
  );
}
