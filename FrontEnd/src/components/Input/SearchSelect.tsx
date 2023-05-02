import useCompanySearch from "../../apis/company/useCompanySearch";
import { useEffect, useState } from "react";
interface props {
  id: string;
  label: string;
  options: string[];
  onChange: (parmas: string) => void;
}

export default function Select({ id, label, options, onChange }: props) {
  const [search, setSearch] = useState("");

 // const res = useCompanySearch(search);

  function goSearch(e: any) {
    onChange(e.target.value);
    setSearch(e.target.value);
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <select id={id} className="w-160 border-2" onChange={goSearch}>
        <option value="" hidden>
          선택
        </option>
        {/* {res.data.value.map((ele: any) => {
          return (
            <option key={ele} value={ele}>
              {ele}
            </option>
          );
        })} */}
      </select>
    </div>
  );
}
