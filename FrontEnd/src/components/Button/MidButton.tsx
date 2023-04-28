interface props {
  type?: string;
  value: string;
  onClick?: () => void;
}
/**
 *
 * @param param0 type:{outline}
 * @returns
 */
export default function MidButton({ type, value, onClick }: props) {
  return (
    <>
      {type === "outline" ? (
        <div
          className="rounded-5 border-solid	border-2 border-blue-400 text-blue-400 text-center w-172 h-32 leading-32 cursor-pointer"
          onClick={onClick}
        >
          {value}
        </div>
      ) : (
        <div
          className="rounded-5 border-solid bg-blue-400 text-white text-center w-172 h-32 leading-32 cursor-pointer"
          onClick={onClick}
        >
          {value}
        </div>
      )}
    </>
  );
}
