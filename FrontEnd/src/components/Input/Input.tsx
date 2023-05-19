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
  cardRegist?: boolean;
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
  cardRegist,
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
    <div className="relative flex flex-col" style={inputStyle}>
      {cardRegist ? (
        <div className="text-bold relative right-0 mt-20 h-8 font-neo text-white">
          {label}
          {warning && <span className="text-12 text-red2 "> *{warning}</span>}
          {confirm && <span className="text-12 text-white"> *{confirm}</span>}
        </div>
      ) : (
        <></>
      )}
      {type === "textarea" ? (
        <textarea
          id={id}
          className="mt-20 resize-none rounded-16 border-3 border-white bg-black bg-opacity-70 px-16 py-16 font-neo text-white shadow-neon2"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          style={textAreaStyle}
        ></textarea>
      ) : (
        <>
          <input
            ref={inputRef}
            className="mt-20 rounded-16 border-3 border-white bg-black bg-opacity-70 px-16 py-16 font-neo text-white shadow-neon2"
            id={id}
            type={inputType}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            value={value}
            disabled={disable}
          ></input>
          {type === "password" && (
            <div className="absolute bottom-38 right-26 h-20 w-20">
              {inputType === "password" ? (
                <img
                  src="/icons/eye-white.svg"
                  className="ml-15 h-20 w-20 cursor-pointer"
                  onClick={convert}
                  alt="비밀번호 보기"
                />
              ) : (
                <img
                  src="/icons/eye-slash-white.svg"
                  className="ml-15 h-20 w-20 cursor-pointer"
                  onClick={convert}
                  alt="비밀번호"
                />
              )}
            </div>
          )}
        </>
      )}
      {cardRegist ? (
        <></>
      ) : (
        <div className="text-bold relative right-0 h-16 text-end font-neo">
          {label}
          {warning && <span className="text-12 text-red2"> *{warning}</span>}
          {confirm && <span className="text-12 text-white"> *{confirm}</span>}
        </div>
      )}

      {value !== "" &&
      querySelect !== undefined &&
      queryResult !== undefined ? (
        queryResult?.length !== 0 ? (
          <div className="absolute top-110 z-10 flex h-200 w-full flex-col overflow-auto border-1 bg-white text-black">
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
          <div className="absolute top-110 z-10 flex h-200 w-full flex-col overflow-auto border-1 bg-white text-black">
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
