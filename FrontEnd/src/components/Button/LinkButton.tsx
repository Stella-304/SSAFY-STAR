interface props {
  children: string;
}

export default function LinkButton({ children }: props) {
  return (
    <div className="cursor-pointer text-blue-500 underline">{children}</div>
  );
}
