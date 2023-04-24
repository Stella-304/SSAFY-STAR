import Input from "../components/Input/Input";

export default function CardSubmit() {
  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-800 h-300 flex m-auto">
        {/* 왼쪽 배경 */}
        <div className="w-400 h-300 bg-red-600"></div>
        {/* 오른쪽 가입영역 */}
        <div className="w-400 h-300 bg-blue-600">
          <div>별 등록</div>
          <div>
            <Input id="name" type="text" label="이름*" />
            <Input id="cardinal" type="text" label="기수*" />
            <Input id="email" type="text" label="이메일*" />
            <Input id="content" type="textbox" label="한마디*" />
            <Input id="job" type="text" label="회사" />
            <Input id="sw" type="text" label="역량테스트등급" />
            <Input id="field" type="text" label="분야" />
            <Input id="github" type="text" label="Github 링크" />
            <Input id="blog" type="text" label="기술 블로그" />
            <Input id="content2" type="text" label="후배기수에게 전하는 조언" />
            <Input id="etc" type="text" label="기타 경력 사항" />
          </div>
        </div>
      </div>
    </div>
  );
}
