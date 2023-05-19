interface props {
  value: string;
  path: boolean;
  onClick?: () => void;
}
export default function HeaderButton({ value, onClick, path }: props) {
  return (
    <>
      {path ? (
        <button
          className="h-32 w-100 rounded-4 bg-black font-neob text-[#2f81f7]"
          onClick={onClick}
        >
          {value}
        </button>
      ) : (
        <button
          className="h-32 w-100 rounded-4 bg-black font-neo text-white hover:text-[#2f81f7]"
          onClick={onClick}
        >
          {value}
        </button>
      )}
    </>
  );
}
