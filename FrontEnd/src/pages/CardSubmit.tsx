import { useDispatch, useSelector } from "react-redux";
import MidButton from "../components/Button/MidButton";
import Input from "../components/Input/Input";
import Select from "../components/Input/Select";
import EarthLayout from "../components/Layout/EarthLayout";
import { campusList, gradeList, fieldList } from "../constants/categories";
import { RootState } from "../stores/store";
import { setCard } from "../stores/card/cardsubmit";

export default function CardSubmit() {
  const { card } = useSelector((state: RootState) => state.card);
  const dispatch = useDispatch();

  //input
  function onName(input: string) {
    dispatch(setCard({ ...card, name: input }));
  }
  function onEmail(input: string) {
    dispatch(setCard({ ...card, onEmail: input }));
  }
  function onCardinal(input: string) {
    dispatch(setCard({ ...card, cardinal: input }));
  }
  function onJob(input: string) {
    //직업 선택 api호출

    dispatch(setCard({ ...card, job: input }));
  }
  function onGithub(input: string) {
    dispatch(setCard({ ...card, github: input }));
  }
  function onBlog(input: string) {
    dispatch(setCard({ ...card, blog: input }));
  }

  //select
  function onCampus(input: string) {
    dispatch(setCard({ ...card, campus: input }));
  }
  function onGrade(input: string) {
    dispatch(setCard({ ...card, grade: input }));
  }
  function onField(input: string) {
    dispatch(setCard({ ...card, field: input }));
  }

  //textarea
  function onContent(input: string) {
    dispatch(setCard({ ...card, content: input }));
  }
  function onContent2(input: string) {
    dispatch(setCard({ ...card, content2: input }));
  }
  function onEtc(input: string) {
    dispatch(setCard({ ...card, etc: input }));
  }

  //등록 진행
  function submit() {
    console.log(card);
  }
  return (
    <EarthLayout>
      <div className="flex justify-center">
        <span className="text-4xl block font-bold">별 등록</span>
      </div>
      <div className="mb-8 h-350 overflow-y-auto pr-8">
        <div className="flex flex-col gap-4">
          <Input
            id="name"
            type="text"
            label="이름*"
            onChange={onName}
            value={card.name}
          />
          <div className="flex justify-between">
            <Input
              id="cardinal"
              type="text"
              label="기수*"
              onChange={onCardinal}
              value={card.cardinal}
            />
            <Select
              id="campus"
              label="캠퍼스"
              options={campusList}
              onChange={onCampus}
            />
          </div>
          <Input
            id="email"
            type="text"
            label="이메일*"
            onChange={onEmail}
            value={card.email}
          />
          <Input
            id="content"
            type="textarea"
            label="한마디*"
            onChange={onContent}
            value={card.content}
          />
          <Input
            id="job"
            type="text"
            label="회사"
            onChange={onJob}
            value={card.job}
          />
          <div className="flex justify-between">
            <Select
              id="grade"
              label="역량테스트등급"
              options={gradeList}
              onChange={onGrade}
            />
            <Select
              id="field"
              label="분야"
              options={fieldList}
              onChange={onField}
            />
          </div>
          <Input
            id="github"
            type="text"
            label="Github 링크"
            onChange={onGithub}
            value={card.github}
          />
          <Input
            id="blog"
            type="text"
            label="기술 블로그"
            onChange={onBlog}
            value={card.blog}
          />
          <Input
            id="content2"
            type="textarea"
            label="후배기수에게 전하는 조언"
            onChange={onContent2}
            value={card.content2}
          />
          <Input
            id="etc"
            type="textarea"
            label="기타 경력 사항"
            onChange={onEtc}
            value={card.etc}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <MidButton value="별 등록" onClick={submit}></MidButton>
      </div>
    </EarthLayout>
  );
}
