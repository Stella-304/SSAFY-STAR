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
import useCardModify from "../../apis/card/useCardModify";
import useCardDelete from "../../apis/card/useCardDelete";
import { CardSubmitType } from "../../types/CardSubmit";
import { isNumber } from "../../utils/regex";
import useCompanySearch from "../../apis/company/useCompanySearch";
import useMyCard from "../../apis/card/useMyCard";

export default function CardModify() {
  const { card } = useSelector((state: RootState) => state.card);
  const [bojTier, setBojTier] = useState("");
  const [search, setSearch] = useState(""); //회사명 검색시 사용

  //react query
  const bojCheckquery = useBojcheck(card.bojid);
  const cardModifyMutate = useCardModify();
  const cardDeleteMutate = useCardDelete();
  const [searchList, setSearchList] = useState([]); //회사명 검색결과
  const companySearchQuery = useCompanySearch(search);

  const myCardQuery = useMyCard();

  const dispatch = useDispatch();

  //경고
  const [cardinalWarning, setCardinalWaring] = useState("");
  const [banWarning, setBanWaring] = useState("");

  //리셋
  useEffect(() => {
    dispatch(resetCard());
    myCardQuery.refetch();
  }, []);

  //api호출
  //백준티어 가져오기
  useMemo(() => {
    if (bojCheckquery.isLoading || bojCheckquery.error) return null;

    if (bojCheckquery.data !== undefined) setBojTier(bojCheckquery.data.value);
  }, [bojCheckquery.isLoading, bojCheckquery.error, bojCheckquery.data]);

  //회사 검색
  useMemo(() => {
    if (companySearchQuery.isLoading || companySearchQuery.error) return null;

    if (companySearchQuery.data !== undefined) {
      if (search === "") {
        setSearchList([]);
      } else {
        setSearchList(companySearchQuery.data.value);
      }
    }
  }, [
    companySearchQuery.isLoading,
    companySearchQuery.error,
    companySearchQuery.data,
  ]);

  //input
  function onBan(input: string) {
    if (input !== "" && !input.match(isNumber)) {
      setBanWaring("숫자만 입력 해주세요");
      setTimeout(() => {
        setBanWaring("");
      }, 1000);
      return;
    }
    setBanWaring("");
    dispatch(setCard({ ...card, ban: input }));
  }
  function onCardinal(input: string) {
    if (input !== "" && !input.match(isNumber)) {
      setCardinalWaring("숫자만 입력 해주세요");
      setTimeout(() => {
        setCardinalWaring("");
      }, 1000);
      return;
    }
    setCardinalWaring("");
    dispatch(setCard({ ...card, generation: input }));
  }

  function onCompany(input: string) {
    //입력값으로 회사를 검색한다.

    setSearch(input);
    if (input !== "") {
      companySearchQuery.refetch();
    } else {
      setSearchList([]);
    }
    //
  }

  function selectCompany(input: string) {
    setSearch(input);
    setSearchList([]);
    dispatch(setCard({ ...card, company: input }));
  }
  function onGithub(input: string) {
    dispatch(setCard({ ...card, githubId: input }));
  }
  function onBlog(input: string) {
    dispatch(setCard({ ...card, blogAddr: input }));
  }

  //백준
  function onBoj(input: string) {
    dispatch(setCard({ ...card, bojid: input }));
  }

  //select
  function onCampus(input: string) {
    dispatch(setCard({ ...card, campus: input }));
  }
  function onGrade(input: string) {
    dispatch(setCard({ ...card, swTier: input }));
  }
  function onField(input: string) {
    dispatch(setCard({ ...card, role: input }));
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
  // function onContent2(input: string) {
  //   dispatch(setCard({ ...card, content2: input }));
  // }
  function onEtc(input: string) {
    dispatch(setCard({ ...card, etc: input }));
  }

  //백준인증하기
  function checkBoj() {
    //백준 인증 진행
    //없으면 unranked
    if (card.bojid === "") {
      return;
    }
    bojCheckquery.refetch();
  }

  //수정 진행
  function submit() {
    //필수 입력 확인
    if (
      card.campus === "" &&
      card.generation === "" &&
      card.ban === "" &&
      card.content === ""
    ) {
      alert("필수 정보를 입력해주세요");
      return;
    }
    if (card.bojid !== "" && bojTier === "") {
      //티어 확인
      alert("백준 티어 확인해주세요");
      return;
    }
    const cardsubmit: CardSubmitType = {
      ban: card.ban,
      blogAddr: card.blogAddr,
      bojid: card.bojid,
      bojTier: bojTier,
      campus: card.campus,
      company: card.company,
      content: card.content,
      etc: card.etc,
      generation: card.generation,
      githubId: card.githubId,
      major: card.major,
      role: card.role,
      swTier: card.swTier,
      track: card.track,
    };
    cardModifyMutate.mutate(cardsubmit);
  }

  function deleteCard() {
    cardDeleteMutate.mutate();
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
              value={card.campus}
            />
            <Input
              id="cardinal"
              type="text"
              label="기수*"
              onChange={onCardinal}
              value={card.generation}
              warning={cardinalWarning}
            />
          </div>
          <div className="flex justify-between">
            <Select
              id="track"
              label="트랙"
              options={trackList}
              onChange={onTrack}
              value={card.track}
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
            value={card.major}
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
            id="company"
            type="text"
            label="회사"
            onChange={onCompany}
            value={search}
            queryResult={searchList}
            querySelect={selectCompany}
          />
          <div className="flex justify-between">
            <Select
              id="grade"
              label="역량테스트등급"
              options={gradeList}
              onChange={onGrade}
              value={card.swTier}
            />
            <Select
              id="field"
              label="분야"
              options={fieldList}
              onChange={onField}
              value={card.role}
            />
          </div>
          <Input
            id="github"
            type="text"
            label="Github 링크"
            onChange={onGithub}
            value={card.githubId}
          />
          <div className="flex">
            <div className="flex-grow">
              <Input
                id="boj"
                type="input"
                label="백준아이디"
                onChange={onBoj}
                value={card?.bojid}
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
            value={card.blogAddr}
          />
          {/* <Input
            id="content2"
            type="textarea"
            label="후배기수에게 전하는 조언"
            onChange={onContent2}
            value={card.content2}
          /> */}
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
        <MidButton value="별 수정" onClick={submit}></MidButton>
        <MidButton value="별 삭제" onClick={deleteCard}></MidButton>
      </div>
    </EarthLayout>
  );
}
