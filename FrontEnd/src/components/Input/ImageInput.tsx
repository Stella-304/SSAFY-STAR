import { ReactNode, useRef, useState } from "react";
import useUserBadgeSubmit from "../../apis/user/useUserBadgeSubmit";
import { BadgeSubmitType } from "../../types/BadgeSubmit";
import SmallButton from "../Button/SmallButton";
import { dataURItoBlob } from "../../utils/util";

interface Props {
  id: string;
  children: ReactNode;
}
export default function ImageInput({ id, children }: Props) {
  const imgRef = useRef(null);
  const [imgsrc, setImgsrc] = useState("" as any);
  const submitMutate = useUserBadgeSubmit();

  const submit = () => {
    let formData = new FormData(); // formData 객체를 생성한다.
    //formData.append("dto", `{"badgeType":"${id}"}`); //{"badgeType":"SSAFY"}
    formData.append("dto", `{ "badgeType": "${id}" }`);
    formData.append("file", dataURItoBlob(imgsrc)); //이미지 소스

    const payload: BadgeSubmitType = {
      formdata: formData,
    };
    submitMutate.mutate(payload);
  };
  const readImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setImgsrc(reader.result);
    };
  };
  return (
    <div>
      <input
        id={id}
        ref={imgRef}
        type="file"
        accept="image/*"
        className="hidden"
        multiple={false}
        onChange={readImage}
      />
      <label htmlFor={id}>
        <div className="flex h-150 w-300 flex-col items-center justify-center bg-slate-400 text-center">
          {/* {children} */}
          <div className="flex flex-col">
            <img
              src={
                imgsrc
                  ? imgsrc
                  : `https://dummyimage.com/300x150/ffffff/000000.png&text=preview+image`
              }
              className="h-150 w-300"
              alt="인증 이미지"
            />
          </div>
        </div>
      </label>
      {imgsrc ? (
        <div className="flex justify-center">
          <SmallButton value="제출" onClick={submit} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
