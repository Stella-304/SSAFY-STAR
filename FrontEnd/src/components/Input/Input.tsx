interface props {
  id: string;
  type: string;
  label: string;
}

export default function Input({ id, type, label }: props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input className="w-240" id={id} type={type}></input>
    </div>
  );
}
