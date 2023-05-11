interface props {
  value: string;
  onClick?: () => void;
}
export default function BigButton({ value, onClick }: props) {
  return (
    <div
      className="mt-20 h-32 w-360 cursor-pointer rounded-8 border-3 border-white bg-black bg-opacity-70  text-center font-neob text-20 text-white shadow-neon2"
      onClick={onClick}
    >
      {value}
    </div>
  );
}
