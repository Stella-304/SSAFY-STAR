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
          className="border-3 rounded-16 w-160 text-20 text-darkgray border-darkgray mt-20 bg-black bg-opacity-70 px-16 py-16 font-neob text-center"
          onClick={() => {
            alert("필수값을 입력해주세요");
          }}
        >
          {value}
        </div>
      ) : type === "outline" ? (
        <div
          className="border-3 rounded-16 text-20 w-160 cursor-pointer text-white border-white mt-20 bg-black bg-opacity-70 px-16 py-16 shadow-neon2 font-neob text-center"
          onClick={onClick}
        >
          {value}
        </div>
      ) : (
        <div
          className="border-3 rounded-16 text-20 w-160 cursor-pointer text-white border-white mt-20 bg-black bg-opacity-70 px-16 py-16 shadow-neon2 font-neob text-center"
          onClick={onClick}
        >
          {value}
        </div>
      )}
    </>
  );
}
