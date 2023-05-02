import { useState } from "react";
import useCompanySearch from "../../apis/company/useCompanySearch";

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
  }
  
  export default function Input({
    id,
    type,
    label,
    onChange,
    value,
    warning, 
    confirm, 
    inputRef,
    disable,
  }: props) {
    const [search,setSearch] = useState("");
    const [searchList,setSearchList] = useState([]);
    const companySearchQuery = useCompanySearch(search,setSearchList);



    return (
      <div className="flex flex-col">
        <label htmlFor={id}>
          {label}
          {warning && <span className="text-red-500 text-12"> *{warning}</span>}
          {confirm && <span className="text-blue-500 text-12"> *{confirm}</span>}
        </label>
        <input
        ref={inputRef}
        className="border-b-1 border-gray-500 text-gray-500"
        id={id}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        disabled={disable}
        ></input>
        {searchList&&
        <div className="flex flex-col">
            {searchList.map((ele)=><div>{ele}</div>)}
        </div>
        }
      </div>
    );
  }
  