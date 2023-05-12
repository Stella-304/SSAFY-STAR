interface props {
  id: string;
  label: string;
  options: string[];
  onChange: (parmas: string) => void;
  value?: string;
}

export default function Select({ id, value, label, options, onChange }: props) {
  return (
    <div className="flex w-full flex-col font-neo text-white ">
      <label
        htmlFor={id}
        className="text-bold relative right-0 mt-20 h-8 font-neo text-white"
      >
        {label}
      </label>
      <select
        id={id}
        className="mt-20 rounded-16 border-3 border-white bg-black bg-opacity-70 px-16 py-16 text-white shadow-neon2"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        <option value="" hidden>
          선택
        </option>
        {options.map((ele) => {
          return (
            <option key={ele} value={ele} className="my-10">
              {ele}
            </option>
          );
        })}
      </select>
    </div>
  );
}
