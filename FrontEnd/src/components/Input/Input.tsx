interface props {
  id: string;
  type: string;
  label: string;
  onChange: (params: string) => void;
  warning?: string;
  confirm?: string;
  value?: string;
  inputRef?: React.ForwardedRef<HTMLInputElement>;
  disable?: boolean;
  queryResult?:string [];
  querySelect?:(params:string)=>void;
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
}: props) {
  return (
    <div className="flex flex-col relative">
      <label htmlFor={id}>
        {label}
        {warning && <span className="text-red-500 text-12"> *{warning}</span>}
        {confirm && <span className="text-blue-500 text-12"> *{confirm}</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          className="border-1 border-gray-500 text-gray-500 resize-none"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        ></textarea>
      ) : (
        <input
          ref={inputRef}
          className="border-b-1 border-gray-500 text-gray-500"
          id={id}
          type={type}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={disable}
        ></input>
      )}
      {querySelect!==undefined&&queryResult!==undefined && queryResult?.length!==0?
        <div className="h-200 w-full flex flex-col absolute top-50 bg-white border-1 z-10 overflow-auto">
            {queryResult?.map((ele)=>
            <div key={ele} onClick={()=>querySelect(ele)} className="cursor-pointer">{ele}</div>
            )}
        </div>
        :
        <></>
        }
    </div>
  );
}
