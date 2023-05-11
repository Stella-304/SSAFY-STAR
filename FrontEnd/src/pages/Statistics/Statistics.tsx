import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import plugin from "chartjs-plugin-datalabels";
import useStatisticsQuery from "@/apis/statistics/useStatisticsQuery";
import HeaderMenu from "@/components/Layout/HeaderMenu";
import quoteIcon from "@/assets/icons/quote.png";
import refreshIcon from "@/assets/icons/refresh.png";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, plugin);

export default function Statistics() {
  const [filterChart, setFilterChart] = useState<string>("generation");
  const [refresh, setRefresh] = useState<boolean>(false);

  const { data } = useStatisticsQuery(filterChart);

  const handleFilterClick = (filter: string) => {
    setFilterChart(filter);
  };

  useEffect(() => {
    if (refresh) {
      setTimeout(() => {
        setRefresh(false);
      }, 500);
    }
  }, [refresh]);

  return (
    <div className="flex flex-col items-center">
      <HeaderMenu />
      <div className="relative mt-100 flex h-200 w-1000 flex-col justify-center rounded-20 border-t-2 border-gray-200 border-t-red-600 shadow-md">
        <img
          src={quoteIcon}
          className="absolute -top-25 left-50 h-50 w-50 shadow-sm"
        />
        <img
          src={refreshIcon}
          className={
            (refresh ? "animate-spinOnce" : "") +
            " absolute right-20 top-10 h-50 w-50 cursor-pointer"
          }
          onClick={() => setRefresh(true)}
        />
      </div>
      <div className="relative flex w-1000 flex-col items-center">
        <div className="absolute left-100 top-30 mb-10 flex h-350 w-100 flex-col gap-10">
          <button
            className={
              (filterChart === "generation"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500") +
              " h-50 w-150 rounded-10 border-3 border-red-500  text-18 font-semibold hover:bg-red-500 hover:text-white"
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
              " h-50 w-150 rounded-10 border-3 border-red-500  text-18 font-semibold hover:bg-red-500 hover:text-white"
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
              " h-50 w-150 rounded-10 border-3 border-red-500  text-18 font-semibold hover:bg-red-500 hover:text-white"
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
              " h-50 w-150 rounded-10 border-3 border-red-500  text-18 font-semibold hover:bg-red-500 hover:text-white"
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
              " h-50 w-150 rounded-10 border-3 border-red-500  text-18 font-semibold hover:bg-red-500 hover:text-white"
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
              " h-50 w-150 rounded-10 border-3 border-red-500  text-18 font-semibold hover:bg-red-500 hover:text-white"
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
              " h-50 w-150 rounded-10 border-3 border-red-500 text-18 font-semibold hover:bg-red-500 hover:text-white"
            }
            onClick={() => handleFilterClick("bojTier")}
          >
            백준 티어
          </button>
        </div>
        {data && (
          <div className="ml-200 mt-50 h-300 w-300">
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
      </div>
    </div>
  );
}
