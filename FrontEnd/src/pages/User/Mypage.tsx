import Input from "../../components/Input/Input";
import EarthLayout from "../../components/Layout/EarthLayout";

export default function Mypage() {
  return (
    <EarthLayout>
      <div className="flex flex-col justify-around h-full">
        <div>
          <span className="text-4xl block font-bold">Mypage</span>
        </div>
        <div>
          {/* 비밀번호 변경 */}
          <div>
            <div>
              <Input
                id="password1"
                type="input"
                label="비밀번호 입력"
                onChange={() => {}}
                value=""
              />
            </div>
          </div>
          {/* 닉네임 변경 */}

          {/* 인증 */}

          {/* 백준업데이트 */}

          {/* 카드수정 */}
        </div>

        <div></div>
      </div>
    </EarthLayout>
  );
}
