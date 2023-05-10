interface props {
  id: string;
  label: string;
  options: string[];
  onChange: (parmas: string) => void;
  value?: string;
}

export default function Select({ id, value, label, options, onChange }: props) {
  return (
    <div className="flex flex-col text-white font-neo w-full ">
      <label htmlFor={id} className="relative h-8 right-0 text-white text-bold font-neo mt-20">{label}</label>
      <select
        id={id}
        className="border-3 rounded-16 text-white border-white mt-20 bg-black bg-opacity-70 px-16 py-16 shadow-neon2"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        <option value="" hidden>
          선택
        </option>
        {options.map((ele) => {
          return (
            <option key={ele} value={ele}>
              {ele}
            </option>
          );
        })}
      </select>
    </div>
  );
}
