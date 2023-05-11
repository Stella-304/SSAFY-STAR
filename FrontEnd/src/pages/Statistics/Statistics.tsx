import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Chart,
  plugins,
} from "chart.js";
import plugin from "chartjs-plugin-datalabels";
import useStatisticsQuery from "@/apis/statistics/useStatisticsQuery";

ChartJS.register(ArcElement, Tooltip, Legend, plugin);

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "%",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function Statistics() {
  const chartInfo = useStatisticsQuery("campus");
  console.log(chartInfo);
  return (
    <>
      <div className="h-300 w-300">
        <Doughnut
          data={{
            labels: ["1", "2", "3", "4", "5", "6"],
            datasets: [
              {
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
                labels: {},
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
                  return context.chart.data.labels
                    ? context.chart.data.labels[context.dataIndex] +
                        "기\n" +
                        value +
                        "%"
                    : "name";
                },
              },
            },
          }}
        />
      </div>
    </>
  );
}
