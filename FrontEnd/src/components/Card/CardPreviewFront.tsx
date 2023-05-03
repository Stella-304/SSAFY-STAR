interface Iprops {
  generation: number;
  name: string;
}

export default function CardPreviewFront({ generation, name }: Iprops) {
  return (
    <div className="h-full w-full select-none rounded-20 bg-gradient-to-b from-cardTop to-[#EFF6EE] px-12 py-15 shadow-md">
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
          <div className="mt-15 text-20 font-bold">{name}</div>
        </div>
      </div>
    </div>
  );
}
