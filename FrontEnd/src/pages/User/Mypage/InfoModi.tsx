import { useMemo, useState } from "react";
import BigButton from "../../../components/Button/BigButton";
import SmallButton from "../../../components/Button/SmallButton";
import Input from "../../../components/Input/Input";
import userBojUpdate from "../../../apis/user/useBojUpdate";
import { passwordReg, nicknameReg } from "../../../utils/regex";
import useUserModify from "../../../apis/user/useUserModify";
import useUserPwdModify from "../../../apis/user/useUserPwdModify";
import { UserModifyType } from "../../../types/UserModifyType";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

export default function InfoModi() {
  //redux
  const user = useSelector((state: RootState) => state.user);

  //백준
  const bojCheck = userBojUpdate();
  const [bojTier, setBojTier] = useState("");

  //비밀번호
  const [password1, setPassword1] = useState("");
  const [password1Warning, setPassword1Warning] = useState("");

  const [password2, setPassword2] = useState("");
  const [password2Warning, setPassword2Warning] = useState("");
  //닉네임
  const [newNickname, setNewNickname] = useState(user.nickname);
  const [nicknameWarning, setNicknameWarning] = useState("");

  //api
  const usermodifyMutate = useUserModify(newNickname);
  const userpwdmodifyMutate = useUserPwdModify();
  useMemo(() => {
    if (bojCheck.isLoading || bojCheck.error) return null;

    if (bojCheck.data !== undefined) setBojTier(bojCheck.data.value);
  }, [bojCheck.isLoading, bojCheck.error, bojCheck.data]);

  //백준
  // function onBoj(input: string) {
  //   setBojid(input);
  // }

  function checkBoj(): void {
    bojCheck.refetch();
  }

  //비밀번호
  function onPass1(input: string) {
    if (!input.match(passwordReg)) {
      setPassword1Warning(
        //8~16자 사이 대문자, 특수문자 한개씩 필수 포함 가능한 특수문자 목록 '!', '@', '?', '#'
        "영문 포함 8글자 16글자 사이(특수문자는 # @ ! ? 만 가능)",
      );
    } else {
      setPassword1Warning("");
    }
    if (input !== password2) {
      setPassword2Warning("비밀번호가 일치하지 않습니다.");
    } else {
      setPassword2Warning("");
    }
    setPassword1(input);
  }
  function onPass2(input: string) {
    if (input !== password1) {
      setPassword2Warning("비밀번호가 일치하지 않습니다.");
    } else {
      setPassword2Warning("");
    }
    setPassword2(input);
  }

  function modiPassword() {
    //비밀번호 수정 진행
    //1차 비밀번호 확인 여부
    if (!password1.match(passwordReg)) {
      alert("비밀번호를 확인해주세요");
      return;
    }
    //2차 비밀번호 일치 여부
    if (password1 !== password2) {
      alert("비밀번호확인을 해주세요");
      return;
    }

    userpwdmodifyMutate.mutate(password1);
  }

  //닉네임
  function onNickname(input: string) {
    if (!input.match(nicknameReg)) {
      setNicknameWarning("닉네임은 5글자 이내입니다.");
      return;
    } else {
      setNicknameWarning("");
    }
    setNewNickname(input);
  }
  function modiNickname() {
    if (!newNickname.match(nicknameReg)) {
      alert("닉네임을 확인해주세요");
      return;
    }
    //닉네임 수정 진행
    const modifyinfo: UserModifyType = {
      nickname: newNickname,
    };
    usermodifyMutate.mutate(modifyinfo);
  }

  return (
    <div className="w-4/5">
      {/* 비밀번호 변경 */}
      <div className="mb-16">
        <div>
          <span className="block text-2xl font-bold">비밀번호 수정</span>
        </div>
        <div>
          <Input
            id="password1"
            type="password"
            onChange={onPass1}
            value={password1}
            warning={password1Warning}
            placeholder="비밀번호 입력"
          />
          <Input
            id="password2"
            type="password"
            onChange={onPass2}
            value={password2}
            warning={password2Warning}
            placeholder="비밀번호 확인"
          />
        </div>
        <div className="flex justify-center">
          <BigButton value="비밀 번호 수정" onClick={modiPassword}></BigButton>
        </div>
      </div>
      <hr />
      <br />
      {/* 닉네임 변경 */}
      <div>
        <div>
          <span className="block text-2xl font-bold">닉네임 수정</span>
        </div>
        <div className="flex flex-row gap-24">
          <div className="flex-grow">
            <Input
              id="nickname"
              type="input"
              onChange={onNickname}
              value={newNickname}
              warning={nicknameWarning}
              placeholder="메타버스 닉네임 수정"
            />
          </div>
          <div className="mb-16 flex items-end">
            <SmallButton value="수정" onClick={modiNickname}></SmallButton>
          </div>
        </div>
      </div>
      {/* 백준업데이트 */}
      <div className="flex flex-row items-center gap-24">
        <div className="flex-grow">
          <Input
            id="boj"
            type="input"
            onChange={() => {}}
            value={
              bojTier === "Unrated"
                ? bojTier + " *solved.ac에 등록해주세요"
                : bojTier
            }
            placeholder="등록된 백준 아이디로 갱신"
            disable={true}
          />
        </div>
        <div className="mb-16 flex items-end">
          <SmallButton value="갱신" onClick={checkBoj}></SmallButton>
        </div>
      </div>
    </div>
  );
}
