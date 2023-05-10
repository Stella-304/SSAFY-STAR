import { useEffect, useRef, useState } from "react";
import useUserBadgeSubmit from "../../apis/user/useUserBadgeSubmit";
import { BadgeSubmitType } from "../../types/BadgeSubmit";
import SmallButton from "../Button/SmallButton";
import { dataURItoBlob } from "../../utils/util";
import useUserBadgeStatus from "../../apis/user/useUserBadgeStatus";
import ModalLayout from "../Layout/ModalLayout";

interface Props {
  id: string;
}
export default function ImageInput({ id }: Props) {
  const imgRef = useRef(null);
  const [imgsrc, setImgsrc] = useState("" as any);
  const [status, setStatus] = useState("");
  const [drag, setDrag] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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
  };
  //이미지 첨부 이벤트
  const readImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgsrc(reader.result);
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
    if (file.type.indexOf("image") === 0) {
      const reader = new FileReader();
      reader.onload = function () {
        setImgsrc(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };
  //문구 생성
  const getStatus = () => {
    if (status === "IN_PROGRESS") {
      return "현재 인증이 진행중입니다.";
    } else if (status === "FINISH") {
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
              <SmallButton value="첨부하기" />
            </label>
            <div>
              <img
                src="/icons/question-mark-circle.svg"
                className="h-24 w-24 cursor-pointer"
                onClick={help}
                alt="도움말"
              />
            </div>
          </div>
          <div
            className="flex h-350 w-400 items-center justify-center bg-gray-200"
            onPaste={pastImage}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDragOver={dragOver}
            onDrop={drop}
          >
            {drag ? (
              <div className="flex h-full w-full items-center justify-center bg-blue-200">
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
                    : `https://dummyimage.com/300x150/ffffff/000000.png&text=PRIVIEW`
                }
                alt="미리보기"
              />
            )}
          </div>
        </div>
        {/* 이미지 전송 */}
        <div className="flex justify-end">
          <SmallButton
            value="제출하기"
            onClick={submit}
            disable={status === "IN_PROGRESS"}
          />
        </div>
      </div>
      {modalOpen ? (
        <ModalLayout onClose={() => setModalOpen(false)}>test</ModalLayout>
      ) : (
        <></>
      )}
    </>
  );
}
