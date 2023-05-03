interface props {
  value: string;
  onClick?: () => void;
}
export default function BigButton({ value, onClick }: props) {
  return (
    <div
      className="h-32 w-360 cursor-pointer rounded-5 bg-black text-center leading-32 text-white"
      onClick={onClick}
    >
      {value}
    </div>
  );
}
