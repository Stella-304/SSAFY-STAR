import MidButton from "../components/Button/MidButton";
import Input from "../components/Input/Input";
import Select from "../components/Input/Select";
import EarthLayout from "../components/Layout/EarthLayout";
import { campus, grade, field } from "../constants/categories";

export default function CardSubmit() {
  return (
    <EarthLayout>
      <div className="flex justify-center">
        <span className="text-4xl block font-bold">별 등록</span>
      </div>
      <div className="mb-8 h-350 overflow-y-auto pr-8">
        <div className="flex flex-col gap-4">
          <Input id="name" type="text" label="이름*" onChange={() => {}} />
          <div className="flex justify-between">
            <Input
              id="cardinal"
              type="text"
              label="기수*"
              onChange={() => {}}
            />
            <Select id="campus" label="캠퍼스" options={campus} />
          </div>
          <Input id="email" type="text" label="이메일*" onChange={() => {}} />
          <Input
            id="content"
            type="textarea"
            label="한마디*"
            onChange={() => {}}
          />
          <Input id="job" type="text" label="회사" onChange={() => {}} />
          <div className="flex justify-between">
            <Select id="grade" label="역량테스트등급" options={grade} />
            <Select id="field" label="분야" options={field} />
          </div>
          <Input
            id="github"
            type="text"
            label="Github 링크"
            onChange={() => {}}
          />
          <Input
            id="blog"
            type="text"
            label="기술 블로그"
            onChange={() => {}}
          />
          <Input
            id="content2"
            type="textarea"
            label="후배기수에게 전하는 조언"
            onChange={() => {}}
          />
          <Input
            id="etc"
            type="textarea"
            label="기타 경력 사항"
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <MidButton value="별 등록"></MidButton>
      </div>
    </EarthLayout>
  );
}
