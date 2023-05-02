interface props {
  value: string;
  onClick?: () => void;
}
/**
 *
 * @param param0 type:{outline}
 * @returns
 */
export default function SmallButton({ value, onClick }: props) {
  return (
    <div
      className="rounded-5 border-solid bg-blue-400 text-white text-center w-80 h-24 leading-24 cursor-pointer"
      onClick={onClick}
    >
      {value}
    </div>
  );
}
