import Input from "../components/Input/Input";
import EarthLayout from "../components/Layout/EarthLayout";

export default function CardSubmit() {
  return (
    <EarthLayout>
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
    </EarthLayout>
  );
}
