interface Iprops {
  generation: number;
  campus: string;
  ban: number;
  name: string;
}

export default function CardPreviewFront({
  generation,
  campus,
  ban,
  name,
}: Iprops) {
  return (
    <div className="box-border h-full w-full rounded-20 border-3 border-white bg-black bg-opacity-70 px-10 py-10 shadow-neon">
      <div className="from-opacity-70 to-opacity-38 relative h-full w-full rounded-15 border-3 border-white bg-gradient-to-b from-black to-darkblue shadow-neon">
        <div className="absolute top-1/3 flex w-full flex-col items-center justify-center text-center">
          <div className="text-14 font-bold text-white">
            {generation}기 {campus} {ban}반
          </div>
          <div className="mt-15 text-20 font-bold text-white">{name}</div>
        </div>
      </div>
    </div>
  );
}
