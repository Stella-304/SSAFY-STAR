interface props {
  id: string;
  label: string;
  options: string[];
  onChange: (parmas: string) => void;
}

export default function Select({ id, label, options, onChange }: props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className="w-160 border-2"
        onChange={(e) => onChange(e.target.value)}
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