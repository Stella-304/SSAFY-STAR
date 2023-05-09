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
          className="h-32 w-100 rounded-4 bg-black text-yellow-500"
          onClick={onClick}
        >
          {value}
        </button>
      ) : (
        <button
          className="h-32 w-100 rounded-4 bg-black text-white hover:text-yellow-400"
          onClick={onClick}
        >
          {value}
        </button>
      )}
    </>
  );
}
