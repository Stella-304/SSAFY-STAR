interface props {
  value: string;
}
export default function BigButton({ value }: props) {
  return (
    <div className="rounded-5 bg-black text-white text-center w-360 h-32 leading-32 cursor-pointer">
      {value}
    </div>
  );
}
