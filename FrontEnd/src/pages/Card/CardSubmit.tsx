import { useDispatch, useSelector } from "react-redux";
import MidButton from "../../components/Button/MidButton";
import Input from "../../components/Input/Input";
import Select from "../../components/Input/Select";
import FormLayout from "../../components/Layout/FormLayout";
import {
  campusList,
  gradeList,
  fieldList,
  trackList,
  majorList,
  generationList,
} from "../../constants/categories";
import { RootState } from "../../stores/store";
import { resetCard, setCard, setName } from "../../stores/card/cardsubmit";
import { useEffect, useState } from "react";
import SmallButton from "../../components/Button/SmallButton";
import useBojcheck from "../../apis/user/useBoj";
import useCardSubmit from "../../apis/card/useCardSubmit";
import { CardSubmitType } from "../../types/CardSubmit";
import { githubIdReg, isNumber, nameReg } from "../../utils/regex";
import useCompanySearch from "../../apis/company/useCompanySearch";
import useCardModify from "../../apis/card/useCardModify";
import useMyCard from "../../apis/card/useMyCard";
import { useNavigate, useParams } from "react-router-dom";
import { setUser } from "../../stores/user/user";
import { setPath } from "../../stores/page/path";
import { USER_NONAME } from "../../constants/default";

export default function CardSubmit() {
  const navigate = useNavigate();
  const { type } = useParams();
  const { card } = useSelector((state: RootState) => state.card);
  const user = useSelector((state: RootState) => state.user);

  const [bojTier, setBojTier] = useState("");
  const [search, setSearch] = useState(""); //회사명 검색시 사용
  const [active, setActive] = useState(false);
  const [searchList, setSearchList] = useState([]); //회사명 검색결과
  const [backInput, setBackInput] = useState(true);

  //react query
  const bojCheckquery = useBojcheck(card.bojId, setBojTier);
  const cardModifyMutate = useCardModify();
  const cardSubmitMutate = useCardSubmit();
  const companySearchQuery = useCompanySearch(search, setSearchList);
  const myCardQuery = useMyCard(setSearch);

  const dispatch = useDispatch();

  //경고
  const [banWarning, setBanWaring] = useState("");
  const [githubWarning, setGithubWarning] = useState("");
  const [nameWarning, setNameWarning] = useState("");

  //리셋
  useEffect(() => {
    dispatch(resetCard());
  }, []);
  useEffect(() => {
    if (type === "modify") {
      dispatch(setPath("cardmodify")); //현 위치 표시
      myCardQuery.refetch();
    } else {
      if (user.cardRegistered) {
        alert("등록하신 카드가 존재합니다.");
        navigate("/");
      }
      dispatch(setPath("cardsubmit")); //현 위치 표시
      //카드 등록하지 않은 경우
      //유저 정보의 이름을 불러서 입력해준다.
      if (user.name !== USER_NONAME) {
        dispatch(setName(user.name));
      }
    }
    return () => {
      dispatch(setPath("")); //나갈땐 리셋
    };
  }, []);

  useEffect(() => {
    if (search !== card.company && search !== "") {
      companySearchQuery.refetch();
    } else {
      setSearchList([]);
    }
  }, [search]);

  useEffect(() => {
    if (checkNecessary()) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [card.name, card.campus, card.generation, card.ban, card.content]);

  //input
  function onName(input: string) {
    if (!input.match(nameReg)) {
      setNameWarning("5글자 이내");
    } else {
      setNameWarning("");
    }
    dispatch(setCard({ ...card, name: input }));
  }

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
    dispatch(setCard({ ...card, generation: input }));
  }

  function onCompany(input: string) {
    //입력값으로 회사를 검색한다.
    setSearch(input);
  }

  function selectCompany(input: string) {
    setSearch(input);
    setSearchList([]);
    dispatch(setCard({ ...card, company: input }));
  }

  const githubPre = (input: string) => {
    //https://github.com/을 제거
    return input.substring(19);
  };
  const githubPost = (input: string) => {
    //https://github.com/을 추가
    return "https://github.com/" + (input ? input : "");
  };

  function onGithub(input: string) {
    input = githubPre(input);
    if (!input.match(githubIdReg)) {
      setGithubWarning("영문과 숫자 하이픈으로 20자 이내");
      return;
    } else {
      setGithubWarning("");
    }
    dispatch(setCard({ ...card, githubId: input }));
  }

  const addressPre = (input: string) => {
    //https://을 제거
    return input.substring(8);
  };
  const addressPost = (input: string) => {
    //https://을 추가
    return "https://" + (input ? input : "");
  };
  function onBlog(input: string) {
    input = addressPre(input);
    dispatch(setCard({ ...card, blogAddr: input }));
  }

  //백준
  function onBoj(input: string) {
    dispatch(setCard({ ...card, bojId: input }));
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
  function onEtc(input: string) {
    dispatch(setCard({ ...card, etc: input }));
  }

  //백준인증하기
  function checkBoj() {
    //백준 인증 진행
    //없으면 unranked
    if (card.bojId === "") {
      return;
    }
    bojCheckquery.refetch();
  }
  function checkNecessary() {
    if (
      !card.name ||
      !card.campus ||
      !card.generation ||
      !card.ban ||
      !card.content
    ) {
      return false;
    }
    return true;
  }
  //등록 진행
  function submit() {
    //필수 입력 확인
    if (!checkNecessary()) {
      alert("필수 정보를 입력해주세요");
      return;
    }
    if (card.bojId !== undefined && card.bojId !== "" && bojTier === "") {
      //티어 확인
      alert("백준 티어 확인해주세요");
      return;
    }

    if (!card.name.match(nameReg)) {
      return alert("이름을 확인해주세요");
    }

    const cardsubmit: CardSubmitType = {
      name: card.name,
      ban: card.ban,
      blogAddr: card.blogAddr,
      bojId: card.bojId,
      bojTier: bojTier,
      campus: card.campus,
      company: card.company,
      content: card.content,
      etc: card.etc,
      generation: card.generation === "비싸피인" ? "0" : card.generation,
      githubId: card.githubId,
      major: card.major,
      role: card.role,
      swTier: card.swTier === "미공개" ? "" : card.swTier,
      track: card.track,
    };

    if (type === "modify") {
      cardModifyMutate.mutate(cardsubmit);
    } else {
      dispatch(setUser({ ...user, cardRegistered: true }));
      cardSubmitMutate.mutate(cardsubmit);
    }
  }

  function reset() {
    setSearch("");
    dispatch(resetCard());
  }

  return (
    <FormLayout>
      <div className="flex h-full w-full flex-col items-center gap-24 font-neob font-bold text-white">
        <div>
          {type === "modify" ? (
            <span className="mb-10 mt-40 block text-4xl font-bold">
              별 수정
            </span>
          ) : (
            <span className="mb-10 mt-40 block text-4xl font-bold">
              별 등록
            </span>
          )}
        </div>
        <div className="mb-8 h-full w-4/5">
          <div>
            <>
              <div className="mt-10 border-b-3 py-10 text-center font-neob text-24 text-white">
                앞면 (필수 사항)
              </div>
              <Input
                id="name"
                type="text"
                label="이름(실명을 입력해주세요)*"
                onChange={onName}
                value={card.name}
                cardRegist={true}
                warning={nameWarning}
              />
              <div className="flex flex-row gap-24">
                <Select
                  id="campus"
                  label="캠퍼스*"
                  options={campusList}
                  onChange={onCampus}
                  value={card.campus}
                />
                <Select
                  id="generation"
                  label="기수*"
                  options={generationList}
                  onChange={onCardinal}
                  value={card.generation}
                />
              </div>
              <Input
                id="ban"
                type="text"
                label="1학기 반*"
                onChange={onBan}
                value={card.ban}
                warning={banWarning}
                cardRegist={true}
              />
              <Input
                id="content"
                type="textarea"
                label="한마디*"
                onChange={onContent}
                value={card.content}
                cardRegist={true}
              />
            </>
            {!backInput ? (
              <></>
            ) : (
              <>
                <div className="mt-10 border-b-3 py-10 text-center font-neob text-24 text-white">
                  뒷면(추가 사항)
                </div>
                <div className="flex flex-row gap-24">
                  <Select
                    id="track"
                    label="트랙"
                    options={trackList}
                    onChange={onTrack}
                    value={card.track}
                  />
                  <Select
                    id="major"
                    label="전공유무"
                    options={majorList}
                    onChange={onMajor}
                    value={card.major}
                  />
                </div>

                <Input
                  id="company"
                  type="text"
                  label="회사(없으면 공란)"
                  onChange={onCompany}
                  value={search}
                  queryResult={searchList}
                  querySelect={selectCompany}
                  queryValue={card.company}
                  cardRegist={true}
                />
                <div className="flex flex-row gap-24">
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
                  label="Github링크"
                  onChange={onGithub}
                  value={githubPost(card.githubId)}
                  warning={githubWarning}
                  cardRegist={true}
                />
                <div className="flex flex-row gap-24">
                  <div className="flex-grow">
                    <Input
                      id="boj"
                      type="input"
                      label="백준아이디"
                      onChange={onBoj}
                      value={card?.bojId}
                      confirm={
                        bojTier === "Unrated"
                          ? bojTier + " *solved.ac에 등록해주세요"
                          : bojTier
                      }
                      cardRegist={true}
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
                  value={addressPost(card.blogAddr)}
                  cardRegist={true}
                />
                <Input
                  id="etc"
                  type="textarea"
                  label="기타 경력 사항"
                  onChange={onEtc}
                  value={card.etc}
                  cardRegist={true}
                />
              </>
            )}
          </div>

          <div className="mb-80 mt-40 flex justify-center gap-16 pb-80">
            {active ? (
              <>
                <MidButton
                  value={type === "modify" ? "수정" : "등록"}
                  onClick={submit}
                  disable={false}
                ></MidButton>
              </>
            ) : (
              <>
                <MidButton
                  value={type === "modify" ? "수정" : "등록"}
                  disable={true}
                />
              </>
            )}

            <MidButton value="초기화" onClick={reset}></MidButton>
          </div>
        </div>
      </div>
    </FormLayout>
  );
}
