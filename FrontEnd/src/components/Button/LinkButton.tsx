interface props {
  children: string;
  onClick?: () => void;
}

export default function LinkButton({ children, onClick }: props) {
  return (
    <span className="cursor-pointer text-blue-500 underline" onClick={onClick}>
      {children}
    </span>
  );
}
