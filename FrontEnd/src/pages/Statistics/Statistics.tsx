import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import plugin from "chartjs-plugin-datalabels";
import useStatisticsQuery from "@/apis/statistics/useStatisticsQuery";
import HeaderMenu from "@/components/Layout/HeaderMenu";
import refreshIcon from "@/assets/icons/refresh.png";
import { useEffect, useState } from "react";
import useSayingQuery from "@/apis/statistics/useSayingQuery";
import useCSQuery from "@/apis/statistics/useCSQuery";

ChartJS.register(ArcElement, Tooltip, Legend, plugin);

export default function Statistics() {
  const [filterChart, setFilterChart] = useState<string>("generation");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [CSIndex, setCSIndex] = useState<number>();
  const [sayingIndex, setSayingIndex] = useState<number>();
  const [CSLen, setCSLen] = useState<number>();
  const [sayingLen, setSayingLen] = useState<number>();
  const [CSTab, setCSTab] = useState<boolean>(true);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const { data } = useStatisticsQuery(filterChart);

  const sayingList = useSayingQuery();

  const csList = useCSQuery();

  const handleFilterClick = (filter: string) => {
    setFilterChart(filter);
  };

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

  useEffect(() => {
    if (CSLen) {
      setCSIndex(Math.floor(Math.random() * CSLen));
    }
    if (sayingLen) {
      setSayingIndex(Math.floor(Math.random() * sayingLen));
    }
  }, [CSTab, CSLen, sayingLen]);

  useEffect(() => {
    if (refresh) {
      setTimeout(() => {
        if (CSTab && CSLen) {
          setCSIndex(Math.floor(Math.random() * (CSLen - 1)));
        }
        if (!CSTab && sayingLen) {
          setSayingIndex(Math.floor(Math.random() * (sayingLen - 1)));
        }
        setShowAnswer(false);
        setRefresh(false);
      }, 500);
    }
  }, [refresh]);

  return (
    <div className="flex flex-col items-center">
      <HeaderMenu />
      <div className="relative mt-100 flex h-200 w-1000 flex-col items-center justify-center rounded-20 border-t-2 border-gray-200 border-t-red-500 shadow-md">
        <div className="absolute -top-15 left-30 flex gap-20">
          <button
            className={
              (CSTab ? "bg-red-500 text-white" : "bg-white text-red-500") +
              " border-red h-40 w-60 rounded-20 border-3 border-red-500  font-bold  hover:bg-red-500 hover:text-white"
            }
            onClick={() => setCSTab(true)}
          >
            CS
          </button>
          <button
            className={
              (CSTab ? "bg-white text-red-500" : "bg-red-500 text-white") +
              " border-red h-40 w-60 rounded-20 border-3 border-red-500  font-bold  hover:bg-red-500 hover:text-white"
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
                className="h-full w-full rounded-20 border-3 border-red-500 font-bold text-red-500 hover:bg-red-500 hover:text-white"
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
      <div className="relative mt-10 flex h-360 w-1000 flex-col items-center rounded-20 border-1 border-gray-200 bg-pink-50 bg-opacity-20 shadow-md">
        <div className="absolute left-150 top-30 mb-10 flex h-350 w-100 flex-col gap-10">
          <button
            className={
              (filterChart === "generation"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500") +
              " h-35 w-130 rounded-10 border-3 border-red-500  text-16 font-semibold hover:bg-red-500 hover:text-white"
            }
            onClick={() => handleFilterClick("generation")}
          >
            기수
          </button>
          <button
            className={
              (filterChart === "campus"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500") +
              " h-35 w-130 rounded-10 border-3 border-red-500  text-16 font-semibold hover:bg-red-500 hover:text-white"
            }
            onClick={() => handleFilterClick("campus")}
          >
            지역
          </button>
          <button
            className={
              (filterChart === "major"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500") +
              " h-35 w-130 rounded-10 border-3 border-red-500  text-16 font-semibold hover:bg-red-500 hover:text-white"
            }
            onClick={() => handleFilterClick("major")}
          >
            전공/비전공
          </button>
          <button
            className={
              (filterChart === "role"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500") +
              " h-35 w-130 rounded-10 border-3 border-red-500  text-16 font-semibold hover:bg-red-500 hover:text-white"
            }
            onClick={() => handleFilterClick("role")}
          >
            FE/BE
          </button>
          <button
            className={
              (filterChart === "track"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500") +
              " h-35 w-130 rounded-10 border-3 border-red-500  text-16 font-semibold hover:bg-red-500 hover:text-white"
            }
            onClick={() => handleFilterClick("track")}
          >
            트랙
          </button>
          <button
            className={
              (filterChart === "swTier"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500") +
              " h-35 w-130 rounded-10 border-3 border-red-500  text-16 font-semibold hover:bg-red-500 hover:text-white"
            }
            onClick={() => handleFilterClick("swTier")}
          >
            역량테스트 등급
          </button>
          <button
            className={
              (filterChart === "bojTier"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500") +
              " h-35 w-130 rounded-10 border-3 border-red-500 text-16 font-semibold hover:bg-red-500 hover:text-white"
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
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                      "rgba(255, 153, 255, 0.2)",
                      "rgba(102, 255, 102, 0.2)",
                      "rgba(51, 102, 153, 0.2)",
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
                      return context?.chart?.data?.labels
                        ? context.chart.data.labels[context.dataIndex] +
                            "\n" +
                            data?.chart[context.dataIndex][2] +
                            "%"
                        : "name";
                    },
                    font: { size: 13, weight: "bold" },
                    textAlign: "center",
                  },
                },
              }}
            />
          </div>
        )}
        <div className="group absolute right-15 top-15 h-40 w-40 cursor-pointer rounded-50 bg-red-500 text-center text-20 font-bold leading-40 text-white">
          ?
          <div className="invisible absolute right-0 top-50 flex h-100 w-150 items-center justify-center rounded-10 border-2 border-red-500 text-15 font-semibold leading-20 text-black group-hover:visible">
            본 통계는 <br /> SSAFY-STAR에 <br /> 등록된 인원만을 <br /> 기준으로
            합니다.
          </div>
        </div>
      </div>
    </div>
  );
}