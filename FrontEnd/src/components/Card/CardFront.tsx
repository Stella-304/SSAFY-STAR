interface Iprops {
  generation: number;
  name: string;
  text: string;
}

export default function CardFront({ generation, name, text }: Iprops) {
  return (
    <div className="w-full h-full rounded-20 bg-gradient-to-b from-cardTop to-[#EFF6EE] px-25 py-28 shadow-md select-none">
      <div className="w-full h-full border-2 border-black rounded-20 relative">
        <div className="w-75 h-25 text-16 font-bold bg-cardTop absolute top-[-15px] left-[calc(50%-37px)] text-center">
          - ★ -
        </div>
        <img
          className="w-[calc(100%-80px)] aspect-square absolute top-20 left-40"
          alt="front"
          src="/background/cardFrontCircle.svg"
        />
        <div className="w-full flex flex-col items-center absolute top-1/3 text-center justify-center">
          <div className="text-16 font-bold">- {generation}기 -</div>
          <div className="text-48 font-bold mt-15">{name}</div>
          <div className="text-20 font-bold mt-20">나의 한마디</div>
          <div className="w-full text-18 mt-22 whitespace-pre-wrap">
            "{text}"
          </div>
        </div>
        <div className="w-200 h-25 text-16 font-bold  bg-cardBottom absolute bottom-[-11px] inline-block left-[calc(50%-100px)] overflow-hidden text-center">
          - ssafy star -
        </div>
      </div>
    </div>
  );
}
