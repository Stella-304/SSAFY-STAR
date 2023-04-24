interface props {
  id: string;
  type: string;
  label: string;
}

export default function Input({ id, type, label }: props) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type}></input>
    </div>
  );
}
