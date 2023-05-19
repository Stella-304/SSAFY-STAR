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
          className="h-44 w-100 cursor-pointer rounded-16 border-3 border-white bg-white text-center font-neob text-16 text-black"
          onClick={onClick}
        >
          {value}
        </button>
      ) : (
        <button
          className="h-44 w-100 cursor-pointer rounded-16 border-3 border-white bg-black bg-opacity-70 text-center font-neob text-16 text-white hover:shadow-neon"
          onClick={onClick}
        >
          {value}
        </button>
      )}
    </>
  );
}
