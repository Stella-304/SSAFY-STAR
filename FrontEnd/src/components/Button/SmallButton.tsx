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
        <div className="h-24 w-80 cursor-pointer rounded-5 border-solid bg-blue-950 text-center leading-24 text-white">
          {value}
        </div>
      ) : (
        <div
          className="h-24 w-80 cursor-pointer rounded-5 border-solid bg-blue-400 text-center leading-24 text-white"
          onClick={onClick}
        >
          {value}
        </div>
      )}
    </>
  );
}
