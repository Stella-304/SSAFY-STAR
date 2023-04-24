interface props {
  id: string;
  type: string;
  label: string;
  selectors: [string];
}

export default function Select({ id, type, label }: props) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type}></input>
    </div>
  );
}
