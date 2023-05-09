import { useEffect, useState } from "react";
import useStarFilterInfoQuery from "../../apis/star/useStarFilterInfoQuery";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterTabOpen,
  setStarEdgeList,
  setStarInfo,
  setViewCard,
} from "../../stores/star/starInfo";
import { RootState } from "../../stores/store";
import useStarFilterInfo from "../../apis/star/useStarFilterInfo";
import { StarFilterType } from "../../types/StarFilterType";
import useStarFilter from "../../hooks/useStarFilter";

const Generation: string[] = Array.from(Array(9), (_, i) => String(i + 1));
const Region: string[] = ["서울", "대전", "구미", "광주", "부울경"];
const Ban: string[] = Array.from(Array(16), (_, i) => String(i + 1));
const BojTier: string[] = ["Platinum"];
const Company: string[] = [];
const Major: string[] = [];
const SwTier: string[] = [];
const Track: string[] = [];
const GroupFlag: string = "";

export default function Filter() {
  const [tabOpen, setTabOpen] = useState<boolean[]>(Array(9).fill(false));
  const [openAnimation, setOpenAnimation] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  const { mutate, data } = useStarFilterInfo();

  const { filter } = useStarFilter(type, info);

  const dispatch = useDispatch();

  const viewCard = useSelector((state: RootState) => state.starInfo.viewCard);

  useEffect(() => {
    mutate({
      ban: filter.ban,
      bojTier: filter.bojTier,
      campus: filter.campus,
      company: filter.company,
      generation: filter.generation,
      major: filter.major,
      role: filter.role,
      swTier: filter.swTier,
      track: filter.track,
      groupFlag: filter.groupFlag,
    });
  }, [filter]);

  useEffect(() => {
    if (data) {
      dispatch(setStarInfo(data.cardList));
      dispatch(setStarEdgeList(data.edgeList));
    }
  }, [data]);

  useEffect(() => {
    if (openAnimation) {
      dispatch(setFilterTabOpen(true));
    } else {
      setTimeout(() => {
        dispatch(setFilterTabOpen(false));
      }, 400);
    }
  }, [openAnimation]);

  return (
    <>
      <div
        className={
          (openAnimation
            ? "translate-x-300 opacity-100 transition duration-700 "
            : "opacity-0 transition duration-700 -translate-x-300 ") +
          " fixed -left-300 top-0 z-20 flex h-full w-300 flex-col items-center overflow-y-scroll bg-white py-10 scrollbar-thin scrollbar-track-blue-100 scrollbar-thumb-blue-400 "
        }
      >
        <div className="flex h-48 w-full items-center pb-10 shadow-sm ">
          <img src="/icons/blue-star.svg" className="ml-28 h-16 w-16" />
          <div className="ml-12 text-18 font-bold">SSAFY STAR</div>
          <div className="ml-30 h-24 w-56 rounded-6 bg-[#E5E9EB] text-center leading-24">
            v1.0.1
          </div>
          <img
            src="/icons/exit.svg"
            className="ml-15 h-16 w-16 cursor-pointer"
            onClick={() => setOpenAnimation(false)}
          />
        </div>
        <div className="mt-23 flex h-32 w-224 cursor-pointer bg-[#EEF0F2]">
          <div
            className={
              (!viewCard && "bg-[#DDE2E4] font-bold") +
              " h-32 w-112 text-center leading-32 "
            }
            onClick={() => dispatch(setViewCard(false))}
          >
            별자리 보기
          </div>
          <div
            className={
              (viewCard && "bg-[#DDE2E4] font-bold") +
              " h-32 w-112 text-center leading-32 "
            }
            onClick={() => dispatch(setViewCard(true))}
          >
            카드 보기
          </div>
        </div>
        <div className="mt-10 flex w-full flex-col gap-10 pl-18">
          <div className="flex">
            <div className="ml-16 text-12 text-[#84919A]">기본 검색</div>
          </div>
          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              let temp = [...tabOpen];
              temp[0] = !temp[0];
              setTabOpen(temp);
            }}
          >
            <img
              src="icons/right-vector-gray.svg"
              className={
                (tabOpen[0] ? "rotate-90" : "") +
                " h-12 w-12 transition duration-500"
              }
            />
            <div className="ml-5 text-14 font-semibold">기수</div>
          </div>
          <div
            className={
              (tabOpen[0] ? "opacity-100" : "invisible h-0 opacity-0") +
              " flex w-full cursor-pointer flex-col gap-8 pl-25 text-14 transition duration-500"
            }
          >
            {Generation.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setType("generation");
                  setInfo(item);
                }}
                className={
                  filter.generation.includes(item) ? "text-blue-400" : ""
                }
              >
                {item}기
              </div>
            ))}
          </div>

          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              let temp = [...tabOpen];
              temp[1] = !temp[1];
              setTabOpen(temp);
            }}
          >
            <img
              src="icons/right-vector-gray.svg"
              className={
                (tabOpen[1] ? "rotate-90" : "") +
                " h-12 w-12 transition duration-500"
              }
            />
            <div className="ml-5 text-14 font-semibold">지역</div>
          </div>
          <div
            className={
              (tabOpen[1] ? "opacity-100" : "invisible h-0 opacity-0") +
              " flex w-full cursor-pointer flex-col gap-8 pl-25 text-14 transition duration-500"
            }
          >
            {Region.map((item: string, index: number) => (
              <div
                key={index}
                onClick={() => {
                  setType("campus");
                  setInfo(item);
                }}
                className={filter.campus.includes(item) ? "text-blue-400" : ""}
              >
                {item}
              </div>
            ))}
          </div>
          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              let temp = [...tabOpen];
              temp[2] = !temp[2];
              setTabOpen(temp);
            }}
          >
            <img
              src="icons/right-vector-gray.svg"
              className={
                (tabOpen[2] ? "rotate-90" : "") +
                " h-12 w-12 transition duration-500"
              }
            />
            <div className="ml-5 text-14 font-semibold">반(1학기)</div>
          </div>
          <div
            className={
              (tabOpen[2] ? "opacity-100" : "invisible h-0 opacity-0") +
              " flex w-full cursor-pointer flex-col gap-8 pl-25 text-14 transition duration-500"
            }
          >
            {Ban.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setType("ban");
                  setInfo(item);
                }}
                className={filter.ban.includes(item) ? "text-blue-400" : ""}
              >
                {item}반
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="ml-16 text-12 text-[#84919A]">상세 검색</div>
          </div>
          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              let temp = [...tabOpen];
              temp[3] = !temp[3];
              setTabOpen(temp);
            }}
          >
            <img
              src="icons/right-vector-gray.svg"
              className={
                (tabOpen[3] ? "rotate-90" : "") +
                " h-12 w-12 transition duration-500"
              }
            />
            <div className="ml-5 text-14 font-semibold">회사</div>
          </div>
          <div
            className={
              (tabOpen[3] ? "opacity-100" : "invisible h-0 opacity-0") +
              " flex w-full cursor-pointer flex-col gap-8 pl-25 text-14 transition duration-500"
            }
          >
            {Company.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setType("company");
                  setInfo(item);
                }}
                className={filter.ban.includes(item) ? "text-blue-400" : ""}
              >
                {item}
              </div>
            ))}
          </div>
          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              let temp = [...tabOpen];
              temp[4] = !temp[4];
              setTabOpen(temp);
            }}
          >
            <img
              src="icons/right-vector-gray.svg"
              className={
                (tabOpen[4] ? "rotate-90" : "") +
                " h-12 w-12 transition duration-500"
              }
            />
            <div className="ml-5 text-14 font-semibold">전공</div>
          </div>
          <div
            className={
              (tabOpen[4] ? "opacity-100" : "invisible h-0 opacity-0") +
              " flex w-full cursor-pointer flex-col gap-8 pl-25 text-14 transition duration-500"
            }
          >
            {Major.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setType("major");
                  setInfo(item);
                }}
                className={filter.ban.includes(item) ? "text-blue-400" : ""}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed left-0 top-20 h-92 w-39 cursor-pointer bg-white hover:brightness-90">
        <img
          src="/icons/sidebar-opener.svg"
          onClick={() => setOpenAnimation(true)}
        />
      </div>
    </>
  );
}
