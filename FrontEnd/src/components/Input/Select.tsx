interface props {
  id: string;
  type: string;
  label: string;
  options: [string];
}

export default function Select({ options }: props) {
  return (
    <select>
      <option value="">선택</option>
      {options.map((ele) => {
        return (
          <option key={ele} value={ele}>
            {ele}
          </option>
        );
      })}
    </select>
  );
}
