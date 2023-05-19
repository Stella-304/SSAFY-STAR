import Verify from "../Verify/Verify";

interface Iprops {
  generation: number;
  name: string;
  text: string;
  isCompanyVerified: boolean;
}

export default function CardFront({
  generation,
  name,
  text,
  isCompanyVerified,
}: Iprops) {
  return (
    <div className="group-one relative box-border h-640 w-480 rounded-2xl border-5 border-white bg-black bg-opacity-70 px-20 py-20 shadow-neon">
      <div className="invisible absolute left-0 top-0 border-r-45 border-t-45 border-white border-r-transparent group-one-hover:visible">
        <div className="absolute -left-100 -top-10 text-24 font-bold text-white">
          CLICK!!
        </div>
      </div>
      <div className="from-opacity-70 to-opacity-38 relative h-full w-full rounded-lg border-5 border-white bg-gradient-to-b from-black to-darkblue shadow-neon">
        <div className="absolute top-1/4 flex w-full flex-col items-center justify-center px-16 text-center font-neob">
          <div className="mt-15 text-48 font-bold text-white">{name}</div>
          <div className="text-16 font-bold text-white">- {generation}기 -</div>
          <div className="mt-20 text-20 font-bold text-white">나의 한마디</div>
          <div className="mt-22 w-full whitespace-pre-wrap pl-10 pr-10 text-18 text-white">
            "{text}"
          </div>
        </div>
      </div>
      {/* <div className="group-two absolute left-30 top-30">
        <div className={isCompanyVerified ? "" : "opacity-50"}>
          <Verify />
        </div>

        {isCompanyVerified ? (
          <div className="invisible absolute left-80 top-15 h-50 w-220 bg-black p-10 text-15 text-white group-two-hover:visible">
            직장 인증이 완료된 유저입니다.
          </div>
        ) : (
          <div className="invisible absolute left-80 top-15 h-50 w-250 bg-black p-10 text-15 text-white group-two-hover:visible">
            직장 인증이 완료되지 않은 유저입니다.
          </div>
        )}
      </div> */}
    </div>
  );
}
