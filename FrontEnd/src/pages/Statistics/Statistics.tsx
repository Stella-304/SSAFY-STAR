import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import plugin from "chartjs-plugin-datalabels";
import useStatisticsQuery from "@/apis/statistics/useStatisticsQuery";
import HeaderMenu from "@/components/Layout/HeaderMenu";
import refreshIcon from "@/assets/icons/refresh.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "@/stores/page/path";
import useSayingQuery from "@/apis/statistics/useSayingQuery";
import useCSQuery from "@/apis/statistics/useCSQuery";

ChartJS.register(ArcElement, Tooltip, Legend, plugin);

export default function Statistics() {
  const [filterChart, setFilterChart] = useState<string>("generation");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [CSIndex, setCSIndex] = useState<number>(0);
  const [sayingIndex, setSayingIndex] = useState<number>(0);
  const [CSLen, setCSLen] = useState<number>(0);
  const [sayingLen, setSayingLen] = useState<number>(0);
  const [CSTab, setCSTab] = useState<boolean>(true);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const { data } = useStatisticsQuery(filterChart);

  const sayingList = useSayingQuery();

  const csList = useCSQuery();
  const dispatch = useDispatch();
  const handleFilterClick = (filter: string) => {
    setFilterChart(filter);
  };
  useEffect(() => {
    dispatch(setPath("statistics")); //현위치 지정
    return () => {
      setPath(""); //나올땐 리셋
    };
  }, []);

  useEffect(() => {
    if (csList?.data) {
      setCSLen(csList?.data?.cs?.length);
    }
  }, [csList?.data]);

  useEffect(() => {
    if (sayingList?.data) {
      setSayingLen(sayingList?.data?.saying?.length);
    }
  }, [sayingList?.data]);

  // useEffect(() => {
  //   if (CSLen) {
  //     setCSIndex(CSIndex);
  //   }
  //   if (sayingLen) {
  //     setSayingIndex(sayingIndex);
  //   }
  // }, [CSTab, CSLen, sayingLen]);

  useEffect(() => {
    if (refresh) {
      setTimeout(() => {
        if (CSTab && CSLen) {
          setCSIndex((CSIndex + 1) % CSLen);
        }
        if (!CSTab && sayingLen) {
          setSayingIndex((sayingIndex + 1) % sayingLen);
        }
        setShowAnswer(false);
        setRefresh(false);
      }, 500);
    }
  }, [refresh]);

  return (
    <div className="flex h-full flex-col items-center bg-[url('/public/background/main_background.png')] bg-cover bg-center bg-no-repeat text-white ">
      <HeaderMenu />
      <div className="relative mb-40 mt-80 flex h-200 w-1000 flex-col items-center justify-center rounded-20 border-b-2 border-t-2 border-gray-200 border-b-darkgray border-t-white bg-black bg-opacity-80 shadow-neon6">
        <div className="absolute -top-15 left-30 flex gap-20">
          <button
            className={
              (CSTab ? "bg-blue-500 text-white" : "bg-black text-blue-500") +
              " border-blue h-40 w-60 rounded-20 border-3 border-blue-500  font-bold  hover:bg-blue-500 hover:text-white"
            }
            onClick={() => setCSTab(true)}
          >
            CS
          </button>
          <button
            className={
              (CSTab ? "bg-black text-blue-500" : "bg-blue-500 text-white") +
              " border-blue h-40 w-60 rounded-20 border-3 border-blue-500  font-bold  hover:bg-blue-500 hover:text-white"
            }
            onClick={() => {
              setCSTab(false);
              setShowAnswer(false);
            }}
          >
            명언
          </button>
        </div>
        <img
          src={refreshIcon}
          className={
            (refresh ? "animate-spinOnce" : "") +
            " absolute right-15 top-15 h-40 w-40 cursor-pointer"
          }
          onClick={() => setRefresh(true)}
        />
        {CSIndex !== undefined && sayingIndex !== undefined && (
          <div className="text-semibold flex h-100 w-700 items-center text-20">
            "{CSTab && csList?.data?.cs[CSIndex][0]}
            {!CSTab && sayingList?.data?.saying[sayingIndex][0]}"
          </div>
        )}
        {CSIndex !== undefined && sayingIndex !== undefined && (
          <div className=" text-bold flex h-50 w-700 items-center text-22 italic">
            {CSTab && showAnswer && (
              <div>- {csList?.data?.cs[CSIndex][1]} -</div>
            )}
            {CSTab && !showAnswer && (
              <button
                className="h-full w-full rounded-20 border-3 border-blue-500 font-bold text-blue-500 hover:bg-blue-500 hover:text-white"
                onClick={() => setShowAnswer(true)}
              >
                정답 보기
              </button>
            )}
            {!CSTab && (
              <div>- {sayingList?.data?.saying[sayingIndex][1]} -</div>
            )}
          </div>
        )}
      </div>
      <div className="relative mt-10 flex h-360 w-1000 flex-col items-center rounded-20 border-2 border-white bg-black bg-opacity-90 text-white shadow-neon2">
        <div className="absolute left-150 top-30 mb-10 flex h-350 w-100 flex-col gap-10">
          <button
            className={
              (filterChart === "generation"
                ? "bg-blue-500 text-white"
                : "bg-black text-blue-500") +
              " h-35 w-130 rounded-10 border-3 border-blue-500  text-16 font-semibold hover:bg-blue-500 hover:text-white"
            }
            onClick={() => handleFilterClick("generation")}
          >
            기수
          </button>
          <button
            className={
              (filterChart === "campus"
                ? "bg-blue-500 text-white"
                : "bg-black text-blue-500") +
              " h-35 w-130 rounded-10 border-3 border-blue-500  text-16 font-semibold hover:bg-blue-500 hover:text-white"
            }
            onClick={() => handleFilterClick("campus")}
          >
            지역
          </button>
          <button
            className={
              (filterChart === "major"
                ? "bg-blue-500 text-white"
                : "bg-black text-blue-500") +
              " h-35 w-130 rounded-10 border-3 border-blue-500  text-16 font-semibold hover:bg-blue-500 hover:text-white"
            }
            onClick={() => handleFilterClick("major")}
          >
            전공/비전공
          </button>
          <button
            className={
              (filterChart === "role"
                ? "bg-blue-500 text-white"
                : "bg-black text-blue-500") +
              " h-35 w-130 rounded-10 border-3 border-blue-500  text-16 font-semibold hover:bg-blue-500 hover:text-white"
            }
            onClick={() => handleFilterClick("role")}
          >
            FE/BE
          </button>
          <button
            className={
              (filterChart === "track"
                ? "bg-blue-500 text-white"
                : "bg-black text-blue-500") +
              " h-35 w-130 rounded-10 border-3 border-blue-500  text-16 font-semibold hover:bg-blue-500 hover:text-white"
            }
            onClick={() => handleFilterClick("track")}
          >
            트랙
          </button>
          <button
            className={
              (filterChart === "swTier"
                ? "bg-blue-500 text-white"
                : "bg-black text-blue-500") +
              " h-35 w-130 rounded-10 border-3 border-blue-500  text-16 font-semibold hover:bg-blue-500 hover:text-white"
            }
            onClick={() => handleFilterClick("swTier")}
          >
            역량테스트 등급
          </button>
          <button
            className={
              (filterChart === "bojTier"
                ? "bg-blue-500 text-white"
                : "bg-black text-blue-500") +
              " h-35 w-130 rounded-10 border-3 border-blue-500 text-16 font-semibold hover:bg-blue-500 hover:text-white"
            }
            onClick={() => handleFilterClick("bojTier")}
          >
            백준 티어
          </button>
        </div>
        {data && (
          <div className="ml-200 mt-30 h-300 w-300">
            <Doughnut
              data={{
                labels: data?.chart.map((item: any) => item[0]),
                datasets: [
                  {
                    data: data?.chart.map((item: any) => item[1]),
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.95)",
                      "rgba(54, 162, 235, 0.95)",
                      "rgba(255, 206, 86, 0.95)",
                      "rgba(75, 192, 192, 0.95)",
                      "rgba(153, 102, 255, 0.95)",
                      "rgba(255, 159, 64, 0.95)",
                      "rgba(255, 153, 255, 0.95)",
                      "rgba(102, 255, 102, 0.95)",
                      "rgba(51, 102, 153, 0.95)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(255, 153, 255, 1)",
                      "rgba(102, 255, 102, 1)",
                      "rgba(51, 102, 153, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        let label = context.dataset.label || "";
                        return label + context.parsed + "명";
                      },
                    },
                  },
                  datalabels: {
                    formatter: function (value, context) {
                      return context?.chart?.data?.labels &&
                        data?.chart[context.dataIndex][2] > 3
                        ? context.chart.data.labels[context.dataIndex] +
                            "\n" +
                            data?.chart[context.dataIndex][2] +
                            "%"
                        : "";
                    },
                    color: "white",
                    font: { size: 13, weight: "bold" },
                    textAlign: "center",
                    padding: 100,
                  },
                },
              }}
            />
          </div>
        )}
        <div className="group absolute right-15 top-15 h-40 w-40 cursor-pointer rounded-50 bg-blue-500 text-center text-20 font-bold leading-40 text-white">
          ?
          <div className="invisible absolute right-0 top-50 flex h-100 w-150 items-center justify-center rounded-10 border-2 border-white text-15 font-semibold leading-20 text-white group-hover:visible">
            본 통계는 <br /> SSAFY-STAR에 <br /> 등록된 인원만을 <br /> 기준으로
            합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
