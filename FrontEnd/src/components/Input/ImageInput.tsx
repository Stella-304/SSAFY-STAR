import { ReactNode, useRef, useState } from "react";
import useUserBadgeSubmit from "../../apis/user/useUserBadgeSubmit";
import { BadgeSubmitType } from "../../types/BadgeSubmit";
import SmallButton from "../Button/SmallButton";

interface Props {
  id: string;
  children : ReactNode;
}
export default function ImageInput({ id,children }: Props) {
  const imgRef = useRef(null)
  const [imgsrc, setImgsrc] = useState("" as any);
  const submitMutate = useUserBadgeSubmit();
  
  const submit = () => {
    let formData = new FormData(); // formData 객체를 생성한다.
    formData.append("badgeType", id);
    formData.append("file", imgsrc); //이미지 소스
    
    const payload: BadgeSubmitType = {
      formdata : formData
    };
    submitMutate.mutate(payload);
  };
  const readImage = (e:any)=>{
    console.log(e.target.files[0])

  
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setImgsrc(reader.result)
    };
  }
  return (
    <div>
      <input id={id} ref={imgRef} type="file" accept="image/*" className="hidden" multiple={false} onChange={readImage} />
      <label htmlFor={id}>
        <div className="w-300 h-150 bg-slate-400 text-center flex flex-col items-center justify-center">
          {/* {children} */}
          <div className="flex flex-col">
            <img
              src={imgsrc ? imgsrc :`https://dummyimage.com/300x150/ffffff/000000.png&text=preview+image`}
              className="w-300 h-150"
              alt="인증 이미지"
              />
          </div>
        </div>
      </label>
      {imgsrc?<div className="flex justify-center">
        <SmallButton value="제출" onClick={submit}/>
      </div>:<></>}
      
    </div>
  );
}
