import Input from "../components/Input/Input";

export default function Signup() {
  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-800 h-300 flex m-auto">
        {/* 왼쪽 배경 */}
        <div className="w-400 h-300 bg-red-600"></div>
        {/* 오른쪽 로그인영역 */}
        <div className="w-400 h-300 bg-blue-600">
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
        </div>
      </div>
    </div>
  );
}
