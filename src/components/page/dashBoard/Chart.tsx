import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement, // 여기 추가
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar, Line } from "react-chartjs-2";

// Chart.js의 필요한 요소를 등록합니다.
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // 여기 추가
  Title,
  Tooltip,
  Legend
);

const ChartSample: React.FC = () => {
  // 차트 데이터
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [3000, 2500, 4000, 3200, 4500, 5000],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // 포인트 색상 (Line 차트에만 적용)
      },
      {
        label: "Expenses",
        data: [2000, 1800, 2800, 2200, 3000, 3500],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Bar 차트를 위한 옵션
  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bar Chart: Sales and Expenses",
      },
    },
  };

  // Line 차트를 위한 옵션
  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Line Chart: Sales and Expenses",
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h2>React Chart Sample</h2>
      {/* Bar Chart */}
      <Bar data={data} options={barOptions} />

      <hr />

      {/* Line Chart */}
      <Line data={data} options={lineOptions} />
    </div>
  );
};

export default ChartSample;
