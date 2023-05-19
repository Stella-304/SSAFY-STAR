import { useEffect, useRef, useState } from "react";
import useUserBadgeSubmit from "../../apis/user/useUserBadgeSubmit";
import { BadgeSubmitType } from "../../types/BadgeSubmit";
import SmallButton from "../Button/SmallButton";
import { dataURItoBlob } from "../../utils/util";
import useUserBadgeStatus from "../../apis/user/useUserBadgeStatus";
import ModalLayout from "../Layout/ModalLayout";
import XSmallButton from "../Button/XSmallButton";

interface Props {
  id: string;
}
export default function ImageInput({ id }: Props) {
  const imgRef = useRef(null);
  const [imgsrc, setImgsrc] = useState("" as any);
  const [status, setStatus] = useState("");
  const [drag, setDrag] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [readyImg, setReadyImg] = useState(false);
  //query
  const submitMutate = useUserBadgeSubmit(id, setStatus, setImgsrc);
  const statusQuery = useUserBadgeStatus(id, setStatus, setImgsrc);

  useEffect(() => {
    statusQuery.refetch();
  }, [id]);

  const submit = () => {
    let formData = new FormData(); // formData 객체를 생성한다.
    formData.append("dto", `{ "badgeType": "${id}" }`);
    formData.append("file", dataURItoBlob(imgsrc)); //이미지 소스

    const payload: BadgeSubmitType = {
      formdata: formData,
    };
    submitMutate.mutate(payload);
    setReadyImg(false);
  };
  //이미지 첨부 이벤트
  const readImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgsrc(reader.result);
      setReadyImg(true);
    };
  };

  //복붙 이미지 첨부 이벤트
  const pastImage = (e: any) => {
    var item = e.clipboardData.items[0];
    if (item.type.indexOf("image") === 0) {
      var blob = item.getAsFile();
      const reader = new FileReader();
      reader.onload = function () {
        setImgsrc(reader.result);
        setReadyImg(true);
      };

      reader.readAsDataURL(blob);
    }
  };

  //https://velog.io/@yiyb0603/React%EC%97%90%EC%84%9C-%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C-%ED%95%98%EA%B8%B0
  //드래그 이벤트
  //이미지를 드래그해서 입력
  const dragEnter = (e: any) => {
    //아래와 같은 막는것을 넣어줘야 drop이벤트를 잡을 수 있다.
    setDrag(true);
    e.stopPropagation();
    e.preventDefault();
  };
  const dragLeave = (e: any) => {
    setDrag(false);
    e.stopPropagation();
    e.preventDefault();
  };
  const dragOver = (e: any) => {
    setDrag(true);
    e.stopPropagation();
    e.preventDefault();
  };
  const drop = (e: any) => {
    setDrag(false);
    e.preventDefault(); //중요
    let file = e.dataTransfer && e.dataTransfer.files[0];
    if (!file) {
      return;
    }
    if (file.type.indexOf("image") === 0) {
      const reader = new FileReader();
      reader.onload = function () {
        setImgsrc(reader.result);
        setReadyImg(true);
      };

      reader.readAsDataURL(file);
    }
  };
  //문구 생성
  const getStatus = () => {
    if (status === "IN_PROGRESS") {
      return "현재 인증이 진행중입니다.";
    } else if (status === "FINISHED") {
      return "인증이 완료 되었습니다.";
    } else {
      return "인증을 진행해 주세요";
    }
  };
  //도움말
  const help = () => {
    setModalOpen(true);
  };

  //NO_REQUEST,IN_PROGRESS, FINISH
  return (
    <>
      <div className="flex flex-col justify-center">
        <input
          id={id}
          ref={imgRef}
          type="file"
          accept="image/*"
          className="hidden"
          multiple={false}
          onChange={readImage}
        />
        {/* 미리보기 이미지  */}
        <div>
          <div className="flex justify-center">
            <span>{getStatus()}</span>
          </div>
          <div className="flex justify-between">
            <label htmlFor={id}>
              <XSmallButton value="첨부하기" />
            </label>
            <div>
              <img
                src="/icons/question-mark-circle-white.svg"
                className="h-24 w-24 cursor-pointer"
                onClick={help}
                alt="도움말"
              />
            </div>
          </div>
          <div
            className="mb-16 mt-16 flex h-350 w-400 items-center justify-center rounded-8 bg-gray-200"
            onPaste={pastImage}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDragOver={dragOver}
            onDrop={drop}
          >
            {drag ? (
              <div className="flex h-full w-full items-center justify-center rounded-8 bg-blue-200">
                <div className="flex h-5/6  w-5/6 items-center justify-center rounded-8 border-2 border-dashed border-black bg-red-300">
                  Drop해주세요
                </div>
              </div>
            ) : (
              <img
                className="max-h-full"
                src={
                  imgsrc
                    ? imgsrc
                    : `https://dummyimage.com/300x150/ffffff/000000.png&text=PREVIEW`
                }
                alt="미리보기"
              />
            )}
          </div>
        </div>
        {/* 이미지 전송 */}
        <div className="flex justify-end">
          <XSmallButton
            value="제출하기"
            onClick={submit}
            disable={status === "IN_PROGRESS" || readyImg === false}
          />
        </div>
      </div>
      {modalOpen ? (
        <ModalLayout onClose={() => setModalOpen(false)} modalWidth="600px">
          <div className="flex h-full flex-col gap-32 overflow-auto p-16 scrollbar-thin scrollbar-thumb-white">
            <div>
              <span className="text-3xl font-bold">인증을 하는방법 </span>
              <br />
              <span className="text-sm font-bold">
                별을 등록했는데, 실제 싸피인이라고 알리고 싶나요?
                <br />
                그럼 인증을 해서 별에 뱃지를 달아 봅시다!
              </span>
              <div>
                <img src="./help/badgecheck.png" alt="뱃지확인" />
              </div>
            </div>
            <hr />
            <div>
              <div>
                <span className="text-3xl font-bold">싸피인증 방법</span>
              </div>
              <div>
                <span className="text-sm font-bold">
                  1. edu.ssafy.com에 로그인 후 로그인 화면 캡쳐
                </span>
                <img src="./help/edussafy.png" alt="edu싸피화면" />
                <span className="text-sm font-bold">2. 수료증 찍기</span>
                <div className="flex justify-center">
                  <img src="./help/edu.png" className="h-300" alt="수료증" />
                </div>
              </div>
            </div>
            <hr />
            <div>
              <div>
                <span className="text-3xl font-bold">회사 인증 방법</span>
              </div>
              <div>
                <span className="text-sm font-bold">1. 사원증 찍기</span>
              </div>
              <div className="flex justify-center">
                <img src="./help/company.png" alt="사원증" />
              </div>
            </div>
          </div>
        </ModalLayout>
      ) : (
        <></>
      )}
    </>
  );
}
