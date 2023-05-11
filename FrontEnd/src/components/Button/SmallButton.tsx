interface props {
  value: string;
  onClick?: () => void;
  disable?: boolean;
}
/**
 *
 * @param param0 type:{outline}
 * @returns
 */
export default function SmallButton({ value, disable, onClick }: props) {
  return (
    <>
      {disable ? (
        <div className="border-3 rounded-16 w-80 text-darkgray border-darkgray mt-20 bg-black bg-opacity-70 px-16 py-16 text-bold font-neob text-center">
          {value}
        </div>
      ) : (
        <div
          className="border-3 cursor-pointer rounded-16 w-80 text-white border-white mt-20 bg-black bg-opacity-70 px-16 py-16 shadow-neon2 text-bold font-neob text-center"
          onClick={onClick}
        >
          {value}
        </div>
      )}
    </>
  );
}
