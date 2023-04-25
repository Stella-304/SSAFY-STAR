interface props {
  value: string;
  onClick?: () => void;
}
export default function BigButton({ value, onClick }: props) {
  return (
    <div
      className="rounded-5 bg-black text-white text-center w-360 h-32 leading-32 cursor-pointer"
      onClick={onClick}
    >
      {value}
    </div>
  );
}
