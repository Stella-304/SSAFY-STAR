interface props {
  type?: string;
  value: string;
  onClick?: () => void;
  disable?: boolean;
}
/**
 *
 * @param param0 type:{outline}
 * @returns
 */
export default function MidButton({ type, value, disable, onClick }: props) {
  return (
    <>
      {disable ? (
        <div
          className="h-32 w-172 cursor-pointer rounded-5 border-solid bg-gray-500 text-center leading-32 text-white"
          onClick={() => {
            alert("필수값을 입력해주세요");
          }}
        >
          {value}
        </div>
      ) : type === "outline" ? (
        <div
          className="h-32 w-172	cursor-pointer rounded-5 border-2 border-solid border-blue-400 text-center leading-32 text-blue-400"
          onClick={onClick}
        >
          {value}
        </div>
      ) : (
        <div
          className="h-32 w-172 cursor-pointer rounded-5 border-solid bg-blue-400 text-center leading-32 text-white"
          onClick={onClick}
        >
          {value}
        </div>
      )}
    </>
  );
}
