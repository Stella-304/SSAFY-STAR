interface props {
  value: string;
  onClick?: () => void;
}
export default function FloatButton({ value, onClick }: props) {
  return (
    <button className=" h-44 w-100 rounded-4 bg-yellow-300" onClick={onClick}>
      {value}
    </button>
  );
}
