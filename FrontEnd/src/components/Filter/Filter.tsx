import { useEffect, useState } from "react";
import useStarFilterInfoQuery from "../../apis/star/useStarFilterInfoQuery";
import { useDispatch } from "react-redux";
import { setStarInfo } from "../../stores/star/starInfo";

const Generation = Array.from(Array(9));
const Region = ["서울", "대전", "구미", "광주", "부울경"];
const Ban = Array.from(Array(16));

export default function Filter() {
  const [viewCard, setViewCard] = useState<boolean>(false);
  const [generation, setGeneration] = useState<number>();
  const [region, setRegion] = useState<string>();
  const [ban, setBan] = useState<number>();

  const starFilterInfo = useStarFilterInfoQuery("campus", "4-대전");

  const dispatch = useDispatch();

  const clickFilterBtn = () => {
    starFilterInfo.refetch();
  };

  useEffect(() => {
    dispatch(setStarInfo(starFilterInfo?.data?.cardList));
  }, [starFilterInfo.isSuccess]);

  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-300 flex-col items-center overflow-y-scroll bg-white py-10 scrollbar-thin scrollbar-track-blue-100 scrollbar-thumb-blue-400">
      <div className="flex h-48 w-full items-center pb-10 shadow-sm ">
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
      <div className="flex w-full flex-col gap-10 pl-18">
        <div className="ml-16 text-12 text-[#84919A]">기본 검색</div>
        <div className="flex cursor-pointer items-center">
          <img src="icons/right-vector-gray.svg" className="h-12 w-12" />
          <div className="ml-5 text-14 font-semibold">기수</div>
        </div>
        <div className="flex w-full cursor-pointer flex-col gap-8 pl-25 text-14">
          {Generation.map((_, i) => (
            <div key={i} onClick={() => setGeneration(i + 1)}>
              {i + 1}기
            </div>
          ))}
        </div>
        <div className="flex cursor-pointer items-center">
          <img src="icons/right-vector-gray.svg" className="h-12 w-12" />
          <div className="ml-5 text-14 font-semibold">지역</div>
        </div>
        <div className="flex w-full cursor-pointer flex-col gap-8 pl-23 text-14">
          {Region.map((item, index) => (
            <div key={index} onClick={() => setRegion(item)}>
              {item}
            </div>
          ))}
        </div>
        <div className="flex cursor-pointer items-center">
          <img src="icons/right-vector-gray.svg" className="h-12 w-12" />
          <div className="ml-5 text-14 font-semibold">반(1학기)</div>
        </div>
        <div className="flex w-full cursor-pointer flex-col gap-8 pl-25 text-14">
          {Ban.map((_, i) => (
            <div key={i} onClick={() => setBan(i + 1)}>
              {i + 1}반
            </div>
          ))}
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
