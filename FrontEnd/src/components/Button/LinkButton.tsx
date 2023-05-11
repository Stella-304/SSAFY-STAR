interface props {
  children: string;
  onClick?: () => void;
}

export default function LinkButton({ children, onClick }: props) {
  return (
    <span className="cursor-pointer text-white " onClick={onClick}>
      {children}
    </span>
  );
}
