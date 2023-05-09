import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import useUserBadgeSubmit from "../../apis/user/useUserBadgeSubmit";
import { BadgeSubmitType } from "../../types/BadgeSubmit";
import SmallButton from "../Button/SmallButton";
import { dataURItoBlob } from "../../utils/util";
import useUserBadgeStatus from "../../apis/user/useUserBadgeStatus";

interface Props {
  id: string;
}
export default function ImageInput({ id }: Props) {
  const imgRef = useRef(null);
  const [imgsrc, setImgsrc] = useState("" as any);
  const [status, setStatus] = useState("");
  const submitMutate = useUserBadgeSubmit(id, setStatus, setImgsrc);
  const statusQuery = useUserBadgeStatus(id, setStatus, setImgsrc);

  useEffect(() => {
    statusQuery.refetch();
  }, [id]);

  // useMemo(() => {
  //   if (statusQuery.isLoading || statusQuery.error) return null;

  //   //FINISHED, IN_PROGRESS, NO_REQUEST
  //   if (statusQuery.data !== undefined) {
  //     setStatus(statusQuery.data.value.badgeStatus);
  //   }
  // }, [statusQuery.isLoading, statusQuery.data, statusQuery.error]);

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
  //NO_REQUEST,IN_PROGRESS, FINISH
  return (
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
        <label htmlFor={id}>
          <SmallButton value="첨부하기" />
        </label>
        <div
          className="flex h-350 w-400 items-center justify-center bg-gray-200"
          onPaste={pastImage}
        >
          <img
            className="max-h-full"
            src={
              imgsrc
                ? imgsrc
                : `https://dummyimage.com/300x150/ffffff/000000.png&text=PRIVIEW`
            }
            alt="미리보기"
          />
        </div>
      </div>
      {/* 이미지 전송 */}
      <div className="flex justify-end">
        <SmallButton value="제출하기" onClick={submit} />
      </div>
    </div>
  );
}

// <img
// src={
//   imgsrc
//     ? imgsrc
//     : `https://dummyimage.com/300x150/ffffff/000000.png&text=FINISH`
// }
// className="h-150 w-300"
// alt="종료"
// />
