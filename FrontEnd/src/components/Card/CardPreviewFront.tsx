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
    <div className="box-border px-10 py-10 w-full h-full bg-opacity-70 bg-black border-3 border-white shadow-neon rounded-20">
      <div className="relative h-full w-full bg-gradient-to-b from-opacity-70 to-opacity-38 from-black to-darkblue border-3 border-white shadow-neon3 rounded-15">
        <div className="absolute top-1/3 flex w-full flex-col items-center justify-center text-center">
          <div className="text-12 text-white font-neo"> {generation}기 {campus} {ban}반 </div>
          <div className="mt-15 text-18 font-bold text-white font-neob">{name}</div>
        </div>
      </div>
    </div>
  );
}
