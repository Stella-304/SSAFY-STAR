interface props {
  value: string;
}
export default function MidButton({ value }: props) {
  return (
    <div className="rounded-5 border-solid	border-2 border-blue-400 text-blue-400 text-center w-172 h-32 leading-32">
      {value}
    </div>
  );
}
