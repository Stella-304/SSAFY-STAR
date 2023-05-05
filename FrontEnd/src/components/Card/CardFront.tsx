import Verify from "../Verify/Verify";

interface Iprops {
  generation: number;
  name: string;
  text: string;
  isSsafyVerified: boolean;
}

export default function CardFront({
  generation,
  name,
  text,
  isSsafyVerified,
}: Iprops) {
  return (
    <div className="relative box-border h-640 w-480 rounded-2xl border-5 border-white bg-black bg-opacity-70 px-20 py-20 shadow-neon">
      <div className="absolute left-0 top-0 h-0 w-0 border-r-30 border-t-30 border-r-transparent border-t-white hover:border-t-blue-900"></div>
      <div className="from-opacity-70 to-opacity-38 relative h-full w-full rounded-lg border-5 border-white bg-gradient-to-b from-black to-darkblue shadow-neon">
        <div className="absolute top-1/4 flex w-full flex-col items-center justify-center px-16 text-center">
          <div className="mt-15 text-48 font-bold text-white">{name}</div>
          <div className="text-16 font-bold text-white">- {generation}기 -</div>
          <div className="mt-20 text-20 font-bold text-white">나의 한마디</div>
          <div className="mt-22 w-full whitespace-pre-wrap pl-10 pr-10 text-18 text-white">
            "{text}"
          </div>
        </div>
      </div>
      {isSsafyVerified && (
        <div className="absolute left-30 top-30">
          <Verify />
        </div>
      )}
    </div>
  );
}
