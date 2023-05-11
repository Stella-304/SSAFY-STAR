import { CSSProperties, useState } from "react";

interface props {
  id: string;
  type: string;
  label?: string;
  onChange: (params: string) => void;
  warning?: string;
  confirm?: string;
  value?: string;
  inputRef?: React.ForwardedRef<HTMLInputElement>;
  disable?: boolean;
  queryResult?: string[];
  querySelect?: (params: string) => void;
  queryValue?: string;
  placeholder?: string;
  cardRegist?:boolean;
  textareaHeight?: string;
  inputHeight?: string;
  inputWidth?: string;
}

export default function Input({
  id,
  type,
  label,
  onChange,
  value,
  warning, //경고 문구
  confirm, //확인 문구
  inputRef,
  disable,
  queryResult,
  querySelect,
  queryValue,
  placeholder,
  cardRegist
  textareaHeight,
  inputHeight,
  inputWidth,
}: props) {
  const [inputType, setInputType] = useState(type);
  const convert = () => {
    if (inputType === "password") {
      setInputType("input");
    } else {
      setInputType("password");
    }
  };

  const textAreaStyle: CSSProperties = {
    height: textareaHeight,
  };
  const inputStyle: CSSProperties = {
    height: inputHeight,
    width: inputWidth,
  };
  return (
    <div className="relative flex flex-col">
      {cardRegist?<div className="relative h-8 right-0 text-white text-bold font-neo mt-20">
        {label}
        {warning && <span className="text-12 text-red2 "> *{warning}</span>}
        {confirm && <span className="text-12 text-white"> *{confirm}</span>}
      </div>:<></>}
      {type === "textarea" ? (
        <textarea
          id={id}
          className="resize-none border-3 rounded-16 text-white border-white mt-20 bg-black bg-opacity-70 px-16 py-16 shadow-neon2 font-neo"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          style={textAreaStyle}
        ></textarea>
      ) : (
        <>
          <input
            ref={inputRef}
            className="border-3 rounded-16 text-white border-white mt-20 bg-black bg-opacity-70 px-16 py-16 shadow-neon2 font-neo"
            id={id}
            type={inputType}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            value={value}
            disabled={disable}
          ></input>
          {type === "password" && (
            <div className="absolute bottom-4 right-20 h-16 w-16">
              {inputType === "password" ? (
                <img
                  src="/icons/eye.svg"
                  className="ml-15 h-16 w-16 cursor-pointer"
                  onClick={convert}
                  alt="비밀번호 보기"
                />
              ) : (
                <img
                  src="/icons/eye-slash.svg"
                  className="ml-15 h-16 w-16 cursor-pointer"
                  onClick={convert}
                  alt="비밀번호"
                />
              )}
            </div>
          )}
        </>
      )}
      {cardRegist?<></>:<div className="relative h-16 right-0 text-end text-bold font-neo">
        {label}
        {warning && <span className="text-12 text-red2"> *{warning}</span>}
        {confirm && <span className="text-12 text-white"> *{confirm}</span>}
      </div>}
      
      {value !== "" &&
      querySelect !== undefined &&
      queryResult !== undefined ? (
        queryResult?.length !== 0 ? (
          <div className="absolute top-50 z-10 flex h-200 w-full flex-col overflow-auto border-1 bg-white">
            {queryResult?.map((ele) => (
              <div
                key={ele}
                onClick={() => querySelect(ele)}
                className="cursor-pointer"
              >
                {ele}
              </div>
            ))}
          </div>
        ) : queryValue !== value ? (
          <div className="absolute top-50 z-10 flex h-200 w-full flex-col overflow-auto border-1 bg-white">
            <div>검색된 결과가 없습니다.</div>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
