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
          className="h-32 w-100 rounded-4 bg-black text-[#2f81f7] font-neob"
          onClick={onClick}
        >
          {value}
        </button>
      ) : (
        <button
          className="h-32 w-100 rounded-4 bg-black text-white hover:text-[#2f81f7] font-neo"
          onClick={onClick}
        >
          {value}
        </button>
      )}
    </>
  );
}
