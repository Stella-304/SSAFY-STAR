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
    <div className="z-20 h-full w-full select-none rounded-20 bg-gradient-to-b from-cardTop to-[#EFF6EE] px-25 py-28 shadow-md">
      <div className="absolute left-0 top-0 h-0 w-0  border-r-30 border-t-30 border-r-transparent border-t-red-500 hover:border-t-red-300"></div>
      <div className="relative h-full w-full rounded-20 border-2 border-black">
        <div className="absolute left-[calc(50%-37px)] top-[-15px] h-25 w-75 bg-cardTop text-center text-16 font-bold">
          - ★ -
        </div>
        <img
          className="absolute left-40 top-20 aspect-square w-[calc(100%-80px)]"
          alt="front"
          src="/background/cardFrontCircle.svg"
        />
        <div className="absolute top-1/3 flex w-full flex-col items-center justify-center text-center">
          <div className="text-16 font-bold">- {generation}기 -</div>
          <div className="mt-15 text-48 font-bold">{name}</div>
          <div className="mt-20 text-20 font-bold">나의 한마디</div>
          <div className="mt-22 w-full whitespace-pre-wrap pl-10 pr-10 text-18">
            "{text}"
          </div>
        </div>
        <div className="absolute bottom-[-11px] left-[calc(50%-100px)] inline-block  h-25 w-200 overflow-hidden bg-cardBottom text-center text-16 font-bold">
          - ssafy star -
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
