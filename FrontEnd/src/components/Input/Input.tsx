interface props {
  id: string;
  type: string;
  label: string;
}

export default function Input({ id, type, label }: props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      {type === "textarea" ? (
        <textarea
          id={id}
          className="border-2 border-black text-gray-500 resize-none"
        ></textarea>
      ) : (
        <input
          className="border-b-2 border-black text-gray-500"
          id={id}
          type={type}
        ></input>
      )}
    </div>
  );
}
