import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
  } from "chart.js";
  import React from "react";
  import { Bar, Line, Pie  } from "react-chartjs-2";
  
  // Chart.js의 필요한 요소를 등록합니다.
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
  
  const ChartSample: React.FC = () => {
    // 차트 데이터
    const chart1data = {
      labels: ["87.247.158.145", "206.168.34.148", "104.248.160.105", "143.42.0.97"],
      datasets: [
        {
          label: "Source IP",
          data: [2, 4, 1, 2],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
        }    
      ],
    };
  
    const chart2data = {
      labels: ["172.31.0.222", "172.31.10.10"],
      datasets: [
        {
          label: "Source IP",
          data: [6, 3],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
        }    
      ],
    };
  
    const chart3data = {
      labels: ["OK", "Failed"],
      datasets: [
        {
          label: "Source IP",
          data: [89, 11],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
        }    
      ],
    };
  
    const chart4data = {
      labels: ["subnet-0ff5c43e17bb00717", "subnet-0c2b94a2bbfe16f44", "subnet-07e6155e9f1b9f14b", "subnet-00fc6631a5cb7539f" ],
      datasets: [
        {
          label: "Source IP",
          data: [6, 0, 3, 0],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
        }    
      ],
    };
    
    const data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Sales",
          data: [3000, 2500, 4000, 3200, 4500, 5000],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
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
          text: "Bar Chart",
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
          text: "Line Chart",
        },
      },
    };
  
    // 파이 차트를 위한 옵션
    const pieOptions: ChartOptions<"pie"> = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Pie Chart",
        },
      },
    };
  
    return (
      <div style={{ width: "90%", margin: "0 auto" }}>
        <h2>React Chart Dashboard</h2>
  
        {/* 레이아웃: 위 3개, 아래 3개 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {/* 차트 1 */}
          <div style={{ 
            flex: "1 1 calc(33.33% - 20px)", 
            minWidth: "300px", 
            background: "#f9f9f9", 
            borderRadius: "15px", 
            padding: "15px", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
          }}>
            <Bar data={chart1data} options={barOptions} />
          </div>
  
          {/* 차트 2 */}
          <div style={{ 
            flex: "1 1 calc(33.33% - 20px)", 
            minWidth: "300px", 
            background: "#f9f9f9", 
            borderRadius: "15px", 
            padding: "15px", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
          }}>
            <Bar data={chart2data} options={barOptions} />
          </div>
  
          {/* 차트 3 */}
          <div style={{ 
            flex: "1 1 calc(33.33% - 20px)", 
            minWidth: "300px", 
            background: "#f9f9f9", 
            borderRadius: "15px", 
            padding: "15px", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
          }}>
            <Pie data={chart3data} options={pieOptions} />
          </div>
  
          {/* 차트 4 */}
          <div style={{ 
            flex: "1 1 calc(33.33% - 20px)", 
            minWidth: "300px", 
            background: "#f9f9f9", 
            borderRadius: "15px", 
            padding: "15px", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
          }}>
            <Bar data={chart4data} options={barOptions} />
          </div>
  
          {/* 차트 5 */}
          <div style={{ 
            flex: "1 1 calc(33.33% - 20px)", 
            minWidth: "300px", 
            background: "#f9f9f9", 
            borderRadius: "15px", 
            padding: "15px", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
          }}>
            <Bar data={data} options={barOptions} />
          </div>
  
          {/* 차트 6 */}
          <div style={{ 
            flex: "1 1 calc(33.33% - 20px)", 
            minWidth: "300px", 
            background: "#f9f9f9", 
            borderRadius: "15px", 
            padding: "15px", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
          }}>
            <Line data={data} options={lineOptions} />
          </div>
        </div>
      </div>
    );
  };
  
  export default ChartSample;