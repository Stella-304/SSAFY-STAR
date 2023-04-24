import Input from "../components/Input/Input";
import EarthLayout from "../components/Layout/EarthLayout";

export default function Signup() {
  return (
    <EarthLayout>
      <div>
        <h1>Register</h1>
        <span>SsafyStar를 사용하기 위해 회원가입 해 주세요</span>
      </div>
      <div>
        <Input id="name" type="input" label="이름" />
        <Input id="email" type="input" label="이메일" />
        <Input id="password1" type="password" label="비밀번호" />
        <Input id="password2" type="password" label="비밀번호 확인" />
      </div>
      <div>
        <div>회원가입</div>
      </div>
    </EarthLayout>
  );
}
