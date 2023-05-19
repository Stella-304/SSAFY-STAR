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
export default function XSmallButton({ value, disable, onClick }: props) {
  return (
    <>
      {disable ? (
        <div className="text-bold w-100 rounded-8 border-3 border-darkgray bg-black bg-opacity-70  text-center font-neob text-darkgray">
          {value}
        </div>
      ) : (
        <div
          className="text-bold w-100 cursor-pointer rounded-8 border-3 border-white bg-black bg-opacity-70  text-center font-neob text-white shadow-neon2"
          onClick={onClick}
        >
          {value}
        </div>
      )}
    </>
  );
}
