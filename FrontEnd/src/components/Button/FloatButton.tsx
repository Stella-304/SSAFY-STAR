interface props {
  value: string;
  path: boolean;
  onClick?: () => void;
}
export default function FloatButton({ value, onClick, path }: props) {
  return (
    <>
      {path ? (
        <button
          className="h-44 w-100 rounded-4 bg-yellow-400"
          onClick={onClick}
        >
          {value}
        </button>
      ) : (
        <button
          className="h-44 w-100 rounded-4 bg-yellow-300"
          onClick={onClick}
        >
          {value}
        </button>
      )}
    </>
  );
}
