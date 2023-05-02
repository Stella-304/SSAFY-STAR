import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import useUserBadgeSubmit from "../../apis/user/useUserBadgeSubmit";
import { BadgeSubmitType } from "../../types/BadgeSubmit";
import SmallButton from "../Button/SmallButton";
import { dataURItoBlob } from "../../utils/util";
import useUserBadgeStatus from "../../apis/user/useUserBadgeStatus";

interface Props {
  id: string;
  children: ReactNode;
}
export default function ImageInput({ id, children }: Props) {
  const imgRef = useRef(null);
  const [imgsrc, setImgsrc] = useState("" as any);
  const submitMutate = useUserBadgeSubmit(id);
  const statusQuery = useUserBadgeStatus(id);
  const [status, setStatus] = useState("");

  useEffect(() => {
    statusQuery.refetch();
  }, [id]);

  useMemo(() => {
    if (statusQuery.isLoading || statusQuery.error) return null;

    //FINISHED, IN_PROGRESS, NO_REQUEST
    if (statusQuery.data !== undefined) {
      setStatus(statusQuery.data.value.badgeStatus);
    }
  }, [statusQuery.isLoading, statusQuery.data, statusQuery.error]);

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
      {status === "NO_REQUEST" ? (
        <>
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
        </>
      ) : status === "IN_PROGRESS" ? (
        <img
          src={
            imgsrc
              ? imgsrc
              : `https://dummyimage.com/300x150/ffffff/000000.png&text=IN_PROGRESS`
          }
          className="h-150 w-300"
          alt="진행중"
        />
      ) : (
        <img
          src={
            imgsrc
              ? imgsrc
              : `https://dummyimage.com/300x150/ffffff/000000.png&text=FINISH`
          }
          className="h-150 w-300"
          alt="종료"
        />
      )}

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
