import MidButton from "../../components/Button/MidButton";
import Input from "../../components/Input/Input";
import EarthLayout from "../../components/Layout/EarthLayout";

export default function Find() {
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
                onChange={() => {}}
                type="input"
              ></Input>
            </div>
            <div className="flex justify-end">
              <MidButton value="아이디찾기" onClick={() => {}}></MidButton>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">비밀번호 재 발급</div>
            <div className="mb-8">
              <Input
                id="email2"
                label="이메일"
                onChange={() => {}}
                type="input"
              ></Input>

              <Input
                id="loginid"
                label="아이디"
                onChange={() => {}}
                type="input"
              ></Input>
            </div>

            <div className="flex justify-end">
              <MidButton value="비밀번호 재발급" onClick={() => {}}></MidButton>
            </div>
          </div>
        </div>
      </div>
    </EarthLayout>
  );
}
