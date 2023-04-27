interface props {
  id: string;
  type: string;
  label: string;
  onChange: (params: string) => void;
  warning?: string;
  value?: string;
  inputRef?: React.ForwardedRef<HTMLInputElement>;
}

export default function Input({
  id,
  type,
  label,
  onChange,
  value,
  warning, //경고 문구
  inputRef,
}: props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>
        {label}
        {warning && <span className="text-red-500 text-12"> *{warning}</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          className="border-2 border-black text-gray-500 resize-none"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        ></textarea>
      ) : (
        <input
          ref={inputRef}
          className="border-b-2 border-black text-gray-500"
          id={id}
          type={type}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        ></input>
      )}
    </div>
  );
}
