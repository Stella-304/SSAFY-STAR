import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilterName,
  clearGroupInfoList,
  clearStarEdgeList,
  clearStarInfo,
  setFilterName,
  setFilterTabOpen,
  setGroupInfoList,
  setStarEdgeList,
  setStarInfo,
  setViewCard,
} from "../../stores/star/starInfo";
import { RootState } from "../../stores/store";
import useStarFilterInfo from "../../apis/star/useStarFilterInfo";
import useStarFilter from "../../hooks/useStarFilter";
import useCompanySearch from "@/apis/company/useCompanySearch";
import {
  banList,
  bojTierList,
  campusList,
  fieldList,
  generationList,
  gradeList,
  majorList,
  trackList,
} from "@/constants/categories";
import swTierIcon from "@/assets/icons/swTier.png";
import bojTierIcon from "@/assets/icons/boj.png";
import generationIcon from "@/assets/icons/generation.png";
import campusIcon from "@/assets/icons/map.png";
import classIcon from "@/assets/icons/classroom.png";
import buildingIcon from "@/assets/icons/building.png";
import deleteIcon from "@/assets/icons/exit.png";
import useStarInfoQuery from "@/apis/useStarInfoQuery";

export default function Filter() {
  const [tabOpen, setTabOpen] = useState<boolean[]>(Array(9).fill(false));
  const [openAnimation, setOpenAnimation] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [filterChange, setFilterChange] = useState<boolean>(false);
  const [searchCompany, setSearchCompany] = useState<string>("");
  const [searchCompanyList, setSearchCompanyList] = useState<string[]>();
  const [viewGroup, setViewGroup] = useState<Number>(3);

  const dispatch = useDispatch();

  // 필터 없을 때
  const initialData = useStarInfoQuery();

  // 필터에 따른 유저 정보 검색(리스트)
  const { mutate, data } = useStarFilterInfo();

  // 필터 선택 커스텀 훅
  const { filter } = useStarFilter(type, info, filterChange);

  // 카드보기
  const viewCard = useSelector((state: RootState) => state.starInfo.viewCard);

  // 회사 필터 검색
  const company = useCompanySearch(searchCompany, setSearchCompanyList);

  // 회사 검색 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCompany(e.target.value);
  };

  // 필터 클릭 핸들러
  const handleClick = (type: string, info: string) => {
    setType(type);
    setInfo(info);
    setFilterChange(true);
  };
  const gruopClick = (group: Number) => {
    setViewGroup(group);
  };

  useEffect(() => {
    dispatch(clearStarInfo());
    dispatch(clearStarEdgeList());
    dispatch(clearGroupInfoList());
    dispatch(clearFilterName());
  }, []);

  useEffect(() => {
    setFilterChange(false);
  }, [filterChange]);

  useEffect(() => {
    if (searchCompany) {
      company.refetch();
    }
  }, [searchCompany]);

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
      dispatch(setGroupInfoList(data.groupInfoDtoList));
      dispatch(setFilterName(data.filterName));
    }
  }, [data]);

  useEffect(() => {
    if (openAnimation) {
      dispatch(setFilterTabOpen(true));
    } else {
      dispatch(setFilterTabOpen(false));
    }
  }, [openAnimation]);

  return (
    <>
      <div
        className={
          (openAnimation
            ? "opacity-100 transition duration-700 translate-x-300 "
            : "opacity-0 transition duration-700 ") +
          " fixed -left-300 top-0 z-20 flex h-full w-300 flex-col items-center overflow-y-scroll bg-black py-10 text-white scrollbar-thin scrollbar-thumb-white "
        }
      >
        <div className="flex h-48 w-full items-center pb-10 shadow-sm ">
          <img src="/icons/blue-star.svg" className="ml-28 h-16 w-16" />
          <div className="ml-12 text-18 font-bold">SSAFY STAR</div>
          <div className="ml-30 h-24 w-56 rounded-6 border-2 border-white bg-black text-center  font-bold leading-24">
            v1.0.1
          </div>
          <img
            src="/icons/exit-white.svg"
            className="ml-15 h-16 w-16 cursor-pointer"
            onClick={() => setOpenAnimation(false)}
          />
        </div>
        <div className="mt-23 flex h-32 w-224 cursor-pointer bg-black">
          <div
            className={
              (!viewCard && "border-2 bg-black font-bold") +
              " h-32 w-112 rounded-8 border-white text-center leading-32 hover:border-1 hover:opacity-70"
            }
            onClick={() => dispatch(setViewCard(false))}
          >
            별자리 보기
          </div>
          <div
            className={
              (viewCard && "border-2 bg-black font-bold") +
              " h-32 w-112 rounded-8 border-white text-center leading-32 hover:border-1 hover:opacity-70 "
            }
            onClick={() => dispatch(setViewCard(true))}
          >
            카드 보기
          </div>
        </div>

        <div className="mt-10 flex w-full flex-col gap-10 pl-18">
          <div className="mt-10 flex">
            <div className="ml-16 text-12 text-[#84919A]">그룹화</div>
          </div>
          <div className="relative mb-10 flex w-250 flex-wrap gap-20 pl-15">
            <div className="group">
              <img
                src={classIcon}
                className={
                  (viewGroup === 1 && "shadow-selected") +
                  " h-40 w-40 cursor-pointer rounded-50 border-2 border-white hover:opacity-80"
                }
                onClick={() => {
                  handleClick("groupFlag", "DETAIL");
                  gruopClick(1);
                }}
              />
              <div className="invisible absolute left-0 top-50 h-30 w-100 rounded-8 border-2 border-white bg-black text-center text-16 leading-30 group-hover:visible">
                기수/지역/반
              </div>
            </div>
            <div className="group">
              <img
                src={generationIcon}
                className={
                  (viewGroup === 2 && "shadow-selected") +
                  " h-40 w-40 cursor-pointer rounded-50 border-2 border-white hover:opacity-80"
                }
                onClick={() => {
                  handleClick("groupFlag", "GENERATION");
                  gruopClick(2);
                }}
              />
              <div className="invisible absolute left-70 top-50 h-30 w-50 rounded-8 border-2 border-white bg-black text-center text-16 leading-30 group-hover:visible">
                기수
              </div>
            </div>
            <div className="group">
              <img
                src={campusIcon}
                className={
                  (viewGroup === 3 && "shadow-selected") +
                  " h-40 w-40 cursor-pointer rounded-50 border-2 border-white hover:opacity-80"
                }
                onClick={() => {
                  handleClick("groupFlag", "CAMPUS");
                  gruopClick(3);
                }}
              />
              <div className="invisible absolute left-130 top-50 h-30 w-50 rounded-8 border-2 border-white bg-black text-center text-16 leading-30 group-hover:visible">
                캠퍼스
              </div>
            </div>
            <div className="group">
              <img
                src={swTierIcon}
                className={
                  (viewGroup === 4 && "shadow-selected") +
                  " h-40 w-40 cursor-pointer rounded-50 border-2 border-white hover:opacity-80"
                }
                onClick={() => {
                  handleClick("groupFlag", "SWTIER");
                  gruopClick(4);
                }}
              />
              <div className="invisible absolute left-170 top-50 h-30 w-80 rounded-8 border-2 border-white bg-black text-center text-16 leading-30 group-hover:visible">
                역량테스트
              </div>
            </div>
            <div className="group">
              <img
                src={bojTierIcon}
                className={
                  (viewGroup === 5 && "shadow-selected") +
                  " h-40 w-40 cursor-pointer rounded-50 border-2 border-white hover:opacity-80"
                }
                onClick={() => {
                  handleClick("groupFlag", "BOJTIER");
                  gruopClick(5);
                }}
              />
              <div className="invisible absolute left-0 top-110 h-30 w-70 rounded-8 border-2 border-white bg-black text-center text-16 leading-30 group-hover:visible">
                백준티어
              </div>
            </div>
            <div className="group">
              <img
                src={buildingIcon}
                className={
                  (viewGroup === 6 && "shadow-selected") +
                  " h-40 w-40 cursor-pointer rounded-50 border-2 border-white hover:opacity-80"
                }
                onClick={() => {
                  handleClick("groupFlag", "company");
                  gruopClick(6);
                }}
              />
              <div className="invisible absolute left-70 top-110 h-30 w-50 rounded-8 border-2 border-white bg-black text-center text-16 leading-30 group-hover:visible">
                회사
              </div>
            </div>
            <div className="group">
              <img
                src={deleteIcon}
                className={
                  (viewGroup === 7 && "shadow-selected") +
                  " h-40 w-40 cursor-pointer rounded-50 border-2 border-white hover:opacity-80"
                }
                onClick={() => {
                  handleClick("groupFlag", "");
                  gruopClick(7);
                }}
              />
              <div className="invisible absolute left-110 top-110 h-30 w-90 rounded-8 border-2 border-white bg-black text-center text-16 leading-30 group-hover:visible">
                그룹화제거
              </div>
            </div>
          </div>
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
                " duration-250 h-12 w-12 transition"
              }
            />
            <div className="ml-5 text-14 font-semibold">기수</div>
          </div>
          <div
            className={
              (tabOpen[0] ? "opacity-100" : "invisible h-0 opacity-0") +
              " flex w-full cursor-pointer flex-wrap gap-y-10 text-14 transition duration-500"
            }
          >
            {generationList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick("generation", item)}
                className={
                  (filter.generation.includes(item)
                    ? "font-semibold text-blue-400"
                    : "") + " w-60 text-center hover:text-yellow-300"
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
                " duration-250 h-12 w-12 transition"
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
            {campusList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick("campus", item)}
                className={
                  filter.campus.includes(item)
                    ? "font-semibold text-blue-400"
                    : "hover:text-blue-400"
                }
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
                " duration-250 h-12 w-12 transition"
              }
            />
            <div className="ml-5 text-14 font-semibold">반(1학기)</div>
          </div>
          <div
            className={
              (tabOpen[2] ? "opacity-100" : "invisible h-0 opacity-0") +
              " flex w-full cursor-pointer flex-wrap gap-y-10 text-14 transition duration-500"
            }
          >
            {banList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick("ban", item)}
                className={
                  (filter.ban.includes(item)
                    ? "font-semibold text-blue-400"
                    : "") + " w-60 text-center hover:text-blue-400"
                }
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
                " duration-250 h-12 w-12 transition"
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
            <input
              className="h-30 w-200 border-1 border-black p-10 text-black"
              placeholder="회사명을 검색하세요."
              onChange={handleChange}
            ></input>
            {searchCompanyList?.map((item: any, index: number) => (
              <div
                key={index}
                onClick={() => handleClick("company", item)}
                className={
                  filter.company.includes(item)
                    ? "font-semibold text-blue-400"
                    : "hover:text-blue-400"
                }
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
                " duration-250 h-12 w-12 transition"
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
            {majorList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick("major", item)}
                className={
                  filter.major.includes(item)
                    ? "font-semibold text-blue-400"
                    : "hover:text-blue-400"
                }
              >
                {item}
              </div>
            ))}
          </div>
          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              let temp = [...tabOpen];
              temp[5] = !temp[5];
              setTabOpen(temp);
            }}
          >
            <img
              src="icons/right-vector-gray.svg"
              className={
                (tabOpen[5] ? "rotate-90" : "") +
                " duration-250 h-12 w-12 transition"
              }
            />
            <div className="ml-5 text-14 font-semibold">FE/BE</div>
          </div>
          <div
            className={
              (tabOpen[5] ? "opacity-100" : "invisible h-0 opacity-0") +
              " flex w-full cursor-pointer flex-col gap-8 pl-25 text-14 transition duration-500"
            }
          >
            {fieldList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick("role", item)}
                className={
                  filter.role.includes(item)
                    ? "font-semibold text-blue-400"
                    : "hover:text-blue-400"
                }
              >
                {item}
              </div>
            ))}
          </div>
          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              let temp = [...tabOpen];
              temp[6] = !temp[6];
              setTabOpen(temp);
            }}
          >
            <img
              src="icons/right-vector-gray.svg"
              className={
                (tabOpen[6] ? "rotate-90" : "") +
                " duration-250 h-12 w-12 transition"
              }
            />
            <div className="ml-5 text-14 font-semibold">트랙</div>
          </div>
          <div
            className={
              (tabOpen[6] ? "opacity-100" : "invisible h-0 opacity-0") +
              " flex w-full cursor-pointer flex-col gap-8 pl-25 text-14 transition duration-500"
            }
          >
            {trackList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick("track", item)}
                className={
                  filter.track.includes(item)
                    ? "font-semibold text-blue-400"
                    : "hover:text-blue-400"
                }
              >
                {item}
              </div>
            ))}
          </div>
          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              let temp = [...tabOpen];
              temp[7] = !temp[7];
              setTabOpen(temp);
            }}
          >
            <img
              src="icons/right-vector-gray.svg"
              className={
                (tabOpen[7] ? "rotate-90" : "") +
                " duration-250 h-12 w-12 transition"
              }
            />
            <div className="ml-5 text-14 font-semibold">역량테스트 등급</div>
          </div>
          <div
            className={
              (tabOpen[7] ? "opacity-100" : "invisible h-0 opacity-0") +
              " flex w-full cursor-pointer flex-col gap-8 pl-25 text-14 transition duration-500"
            }
          >
            {gradeList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick("swTier", item)}
                className={
                  filter.swTier.includes(item)
                    ? "font-semibold text-blue-400"
                    : "hover:text-blue-400"
                }
              >
                {item}
              </div>
            ))}
          </div>
          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              let temp = [...tabOpen];
              temp[8] = !temp[8];
              setTabOpen(temp);
            }}
          >
            <img
              src="icons/right-vector-gray.svg"
              className={
                (tabOpen[8] ? "rotate-90" : "") +
                " duration-250 h-12 w-12 transition"
              }
            />
            <div className="ml-5 text-14 font-semibold">백준 티어</div>
          </div>
          <div
            className={
              (tabOpen[8] ? "opacity-100" : "invisible h-0 opacity-0") +
              " flex w-full cursor-pointer flex-col gap-8 pl-25 text-14 transition duration-500"
            }
          >
            {bojTierList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick("bojTier", item)}
                className={
                  filter.track.includes(item)
                    ? "font-semibold text-blue-400"
                    : "hover:text-blue-400"
                }
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed left-0 top-20 h-92 w-39 cursor-pointer hover:brightness-90">
        <img
          src="/icons/sidebar-opener2.png"
          onClick={() => setOpenAnimation(true)}
        />
      </div>
    </>
  );
}
