import Input from "../components/Input/Input";
import EarthLayout from "../components/Layout/EarthLayout";

export default function Login() {
  return (
    <EarthLayout>
      <div>
        <h1>Login</h1>
        <span>SsafyStar를 사용하기 위해 로그인 해 주세요</span>
      </div>
      <div>
        <Input id="email" type="input" label="이메일" />
        <Input id="password" type="password" label="비밀번호" />
        <div>비밀번호를 잊으셨나요?</div>
      </div>
      <div>
        {/* oauth */}
        <div>
          <div>구글 로그인</div>
          <div>kakao 로그인</div>
        </div>
        <div>로그인</div>
        <div>회원정보가 없으신가요? Register Herer</div>
      </div>
    </EarthLayout>
  );
}
