import { useDispatch, useSelector } from "react-redux";
import MidButton from "../../components/Button/MidButton";
import Input from "../../components/Input/Input";
import Select from "../../components/Input/Select";
import EarthLayout from "../../components/Layout/EarthLayout";
import {
  campusList,
  gradeList,
  fieldList,
  trackList,
  majorList,
} from "../../constants/categories";
import { RootState } from "../../stores/store";
import { resetCard, setCard } from "../../stores/card/cardsubmit";
import { useEffect, useMemo, useState } from "react";
import SmallButton from "../../components/Button/SmallButton";
import useBojcheck from "../../apis/user/useBoj";
import useCardSubmit from "../../apis/card/useCardSubmit";
import { CardSubmitType } from "../../types/CardSubmit";
import { isNumber } from "../../utils/regex";

export default function CardSubmit() {
  const { card } = useSelector((state: RootState) => state.card);
  const bojCheckquery = useBojcheck(card.boj);
  const cardSubmitMutate = useCardSubmit();
  const [bojTier, setBojTier] = useState("");
  const dispatch = useDispatch();

  //경고
  const [cardinalWarning, setCardinalWaring] = useState("");
  const [banWarning, setBanWaring] = useState("");

  //리셋
  useEffect(() => {
    dispatch(resetCard());
  }, []);

  useMemo(() => {
    if (bojCheckquery.isLoading || bojCheckquery.error) return null;

    if (bojCheckquery.data !== undefined) setBojTier(bojCheckquery.data.value);
  }, [bojCheckquery.isLoading, bojCheckquery.error, bojCheckquery.data]);
  //input

  function onBan(input: string) {
    if (!input.match(isNumber)) {
      setBanWaring("숫자만 입력 해주세요");
      return;
    }
    setBanWaring("");
    dispatch(setCard({ ...card, ban: input }));
  }
  function onCardinal(input: string) {
    if (!input.match(isNumber)) {
      setCardinalWaring("숫자만 입력 해주세요");
      return;
    }
    setCardinalWaring("");
    dispatch(setCard({ ...card, cardinal: input }));
  }

  function onJob(input: string) {
    dispatch(setCard({ ...card, job: input }));
  }
  function onGithub(input: string) {
    dispatch(setCard({ ...card, github: input }));
  }
  function onBlog(input: string) {
    dispatch(setCard({ ...card, blog: input }));
  }

  //백준
  function onBoj(input: string) {
    dispatch(setCard({ ...card, boj: input }));
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
  function onTrack(input: string) {
    dispatch(setCard({ ...card, track: input }));
  }
  function onMajor(input: string) {
    dispatch(setCard({ ...card, major: input }));
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

  //백준인증하기
  function checkBoj() {
    //백준 인증 진행
    //없으면 unranked
    if (card.boj === "") {
      return;
    }
    bojCheckquery.refetch();
  }

  //등록 진행
  function submit() {

    //필수 입력 확인
    if (
      card.campus === "" &&
      card.cardinal === "" &&
      card.ban === "" &&
      card.content === ""
    ) {
      return;
    }
    if (card.boj !== "" && bojTier === "") {
      //티어 확인
      alert("백준 티어 확인해주세요");
      return;
    }
    const cardsubmit: CardSubmitType = {
      ban: card.ban,
      blogAddr: card.blog,
      bojid: card.boj,
      bojTier: bojTier,
      campus: card.campus,
      company: card.job,
      content: card.content,
      etc: card.etc,
      generation: card.cardinal,
      githubId: card.github,
      major: card.major,
      role: card.field,
      swTier: card.grade,
      track: card.track,
    };
    cardSubmitMutate.mutate(cardsubmit);
  }

  return (
    <EarthLayout>
      <div className="flex justify-center">
        <span className="block text-4xl font-bold">별 등록</span>
      </div>
      <div className="mb-8 h-500 overflow-y-auto pr-8">
        <div className="flex flex-col gap-4">
          {/* <div className="flex justify-between"> */}
          <div className="flex justify-between">
            <Select
              id="campus"
              label="캠퍼스*"
              options={campusList}
              onChange={onCampus}
            />
            <Input
              id="cardinal"
              type="text"
              label="기수*"
              onChange={onCardinal}
              value={card.cardinal}
              warning={cardinalWarning}
            />
          </div>
          <div className="flex justify-between">
            <Select
              id="track"
              label="트랙"
              options={trackList}
              onChange={onTrack}
            />
            <Input
              id="ban"
              type="text"
              label="1학기 반*"
              onChange={onBan}
              value={card.ban}
              warning={banWarning}
            />
          </div>

          <Select
            id="major"
            label="전공유무"
            options={majorList}
            onChange={onMajor}
          />

          {/* </div> */}
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
          <div className="flex">
            <div className="flex-grow">
              <Input
                id="boj"
                type="input"
                label="백준아이디"
                onChange={onBoj}
                value={card?.boj}
                confirm={
                  bojTier === "Unrated"
                    ? bojTier + " *solved.ac에 등록해주세요"
                    : bojTier
                }
              />
            </div>
            <div className="flex items-end">
              <SmallButton value="확인" onClick={checkBoj}></SmallButton>
            </div>
          </div>
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
