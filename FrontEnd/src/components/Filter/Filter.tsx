import { useEffect, useState } from "react";
import useStarFilterInfoQuery from "../../apis/star/useStarFilterInfoQuery";
import { useDispatch } from "react-redux";
import { setStarInfo } from "../../stores/star/starInfo";

export default function Filter() {
  const [viewCard, setViewCard] = useState<boolean>(false);

  const starFilterInfo = useStarFilterInfoQuery("campus", "8-대전");

  const dispatch = useDispatch();

  const clickFilterBtn = () => {
    starFilterInfo.refetch();
  };

  useEffect(() => {
    dispatch(setStarInfo(starFilterInfo.data.value.cardList));
  }, [starFilterInfo.isSuccess]);

  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-289 flex-col items-center bg-white">
      <div className="flex h-48 w-full items-center shadow-sm">
        <img src="/icons/blue-star.svg" className="ml-28 h-16 w-16" />
        <div className="ml-12 text-18 font-bold">SSAFY STAR</div>
        <div className="ml-59 h-24 w-56 rounded-6 bg-[#E5E9EB] text-center leading-24">
          v1.0.0
        </div>
      </div>
      <div className="mt-23 flex h-32 w-224 cursor-pointer bg-[#EEF0F2]">
        <div
          className={
            (!viewCard && "bg-[#DDE2E4] font-bold") +
            " h-32 w-112 text-center leading-32 "
          }
          onClick={() => setViewCard(false)}
        >
          별자리 보기
        </div>
        <div
          className={
            (viewCard && "bg-[#DDE2E4] font-bold") +
            " h-32 w-112 text-center leading-32 "
          }
          onClick={() => setViewCard(true)}
        >
          카드 보기
        </div>
      </div>
      <div>
        <button className="h-40 w-100 bg-blue-200" onClick={clickFilterBtn}>
          필터 보기
        </button>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
