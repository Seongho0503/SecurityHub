import React, { useState } from "react";
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
import { Bar, Line, Pie } from "react-chartjs-2";


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

  const getChartTitle = (data:any) => {
    return data.datasets && data.datasets.length > 0 ? data.datasets[0].label : 'Default Title';
  };

    const [selectedDate, setSelectedDate] = useState<string>("2024-01");
  
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedDate(event.target.value);
    };
  
    // Generate months from January to December
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const [activeTab, setActiveTab] = useState("eks");

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    heading: {
      fontSize: "1.5rem",
      color: "#333",
      marginBottom: "15px",
    },
    selectBox: {
      padding: "10px 15px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "1px solid #ddd",
      backgroundColor: "#fff",
      outline: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    option: {
      padding: "10px",
      fontSize: "1rem",
    },
    selectedDate: {
      marginTop: "10px",
      fontSize: "1rem",
      color: "#555",
    },
  };


  const lambdadata1 = {
    labels: ["Informational", "Low"],
    datasets: [
      {
        label: "Severity",
        data: [88, 12],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)", // Color for "Informational"
          "rgba(255, 159, 64, 0.5)", // Color for "Low"
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Border color for "Informational"
          "rgba(255, 159, 64, 1)", // Border color for "Low"
        ],
        borderWidth: 1,
        pointBackgroundColor: [
          "rgba(75, 192, 192, 1)", // Border color for "Informational"
          "rgba(255, 159, 64, 1)", // Border color for "Low"
        ],
      },
    ],
  };
  
  const lambdadata2 = {
    labels: ["Success", "Fail"],
    datasets: [
      {
        label: "Source IP",
        data: [63, 27],
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)", // Color for "Success"
          "rgba(255, 99, 132, 0.5)", // Color for "Fail"
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)", // Border color for "Success"
          "rgba(255, 99, 132, 1)", // Border color for "Fail"
        ],
        borderWidth: 1,
        pointBackgroundColor: [
          "rgba(54, 162, 235, 1)", // Border color for "Success"
          "rgba(255, 99, 132, 1)", // Border color for "Fail"
        ],
      },
    ],
  };

  // 차트 데이터 (각각 eks, vpc, lambda에 맞는 데이터를 설정)
  const chart1data = {
    labels: ["87.247.158.145", "206.168.34.148", "104.248.160.105", "143.42.0.97"],
    datasets: [
      {
        label: "Source IP",
        data: [2, 4, 1, 2],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const eksData1 = {
    labels: ["45.33.32.156", "74.125.24.101", "104.244.42.65", "198.252.206.140"],
    datasets: [
      {
        label: "Source IP",
        data: [2, 4, 1, 2],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const eksData2 = {
    labels: ["SecurityHub-Cluster", "ETC"],
    datasets: [
      {
        label: "Cluster Name",
        data: [100, 0],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const chart2data = {
    labels: ["172.31.0.222", "172.31.10.10"],
    datasets: [
      {
        label: "Destination IP",
        data: [6, 3],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const chart3data = {
    labels: ["OK", "Failed"],
    datasets: [
      {
        label: "Status Code",
        data: [89, 11],
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)", // Color for "Success"
          "rgba(255, 99, 132, 0.5)", // Color for "Fail"
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)", // Border color for "Success"
          "rgba(255, 99, 132, 1)", // Border color for "Fail"
        ],
        borderWidth: 1,
        pointBackgroundColor: [
          "rgba(54, 162, 235, 1)", // Border color for "Success"
          "rgba(255, 99, 132, 1)", // Border color for "Fail"
        ],
      },
    ],
  };

  const chart4data = {
    labels: [
      "subnet-0ff5c43e17bb00717",
      "subnet-0c2b94a2bbfe16f44",
      "subnet-07e6155e9f1b9f14b",
      "subnet-00fc6631a5cb7539f",
    ],
    datasets: [
      {
        label: "Destination Subnet",
        data: [6, 0, 3, 0],
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };

  const chart5data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [3000, 2500, 4000, 3200, 4500, 5000],
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(255, 159, 64, 1)",
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

  const chart6data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Visitors",
        data: [500, 700, 400, 600, 800, 950],
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };

  const barOptions1: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: getChartTitle(chart4data),
      },
    },
  };

  const barOptions2: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: getChartTitle(chart2data),
      },
    },
  };

  const barOptions3: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: getChartTitle(chart1data),
      },
    },
  };

  const barOptions4: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: getChartTitle(eksData1),
      },
    },
  };


  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: getChartTitle(chart4data),
      },
    },
  };

  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: getChartTitle(lambdadata1),
      },
    },
  };

  const pieOptions1: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: getChartTitle(eksData2),
      },
    },
  };

  const pieOptions2: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: getChartTitle(chart3data),
      },
    },
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    
    <div style={{ width: "90%", margin: "0 auto" }}>

<div style={styles.container}>
      <select value={selectedDate} onChange={handleChange} style={styles.selectBox}>
        {months.map((month) => {
          const formattedMonth = month.toString().padStart(2, "0");
          return (
            <option key={formattedMonth} value={`2024-${formattedMonth}`} style={styles.option}>
              2024-{formattedMonth}
            </option>
          );
        })}
      </select>
    </div>

      {/* 탭 메뉴 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => handleTabChange("eks")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: activeTab === "eks" ? "#007BFF" : "#f1f1f1",
            color: activeTab === "eks" ? "#fff" : "#333",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          EKS
        </button>
        <button
          onClick={() => handleTabChange("vpc flow")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: activeTab === "vpc flow" ? "#007BFF" : "#f1f1f1",
            color: activeTab === "vpc flow" ? "#fff" : "#333",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          VPC FLOW
        </button>
        <button
          onClick={() => handleTabChange("lambda")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "lambda" ? "#007BFF" : "#f1f1f1",
            color: activeTab === "lambda" ? "#fff" : "#333",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Lambda
        </button>
      </div>

      {/* 탭별 차트 */}
      {activeTab === "vpc flow" && (
  <div>
    <h1>VPC FLOW</h1>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
      <div style={{ flex: "1 1 calc(50% - 20px)", minWidth: "300px", padding: "15px", width: "500px", height: "400px", background: "#f9f9f9", 
          borderRadius: "15px", 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <Bar data={chart1data} options={barOptions3} />
      </div>
      <div style={{ flex: "1 1 calc(50% - 20px)", minWidth: "300px", padding: "15px", width: "500px", height: "400px", background: "#f9f9f9", 
          borderRadius: "15px", 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <Bar data={chart2data} options={barOptions2} />
      </div>
      <div style={{ flex: "1 1 calc(30% - 10px)", minWidth: "300px", padding: "15px", width: "500px", height: "400px", background: "#f9f9f9", 
          borderRadius: "15px", 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"  }}>
        <Pie data={chart3data} options={pieOptions2} />
      </div>
      <div style={{ flex: "1 1 calc(50% - 20px)", minWidth: "300px", padding: "15px", width: "500px", height: "400px", background: "#f9f9f9", 
          borderRadius: "15px", 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"  }}>
        <Bar data={chart4data} options={barOptions1} />
      </div>
    </div>
  </div>
)}



      {activeTab === "eks" && (
        <div>
          <h1>EKS</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
           
            <div style={{ flex: "1 1 calc(33.33% - 20px)", minWidth: "300px", padding: "15px",   background: "#f9f9f9", 
          borderRadius: "15px", 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
 }}>
              <Bar data={eksData1} options={barOptions4} />
            </div>
            <div style={{ flex: "1 1 calc(33.33% - 20px)", minWidth: "300px", padding: "15px", background: "#f9f9f9", 
          borderRadius: "15px", 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
              <Pie data={eksData2} options={pieOptions1} />
            </div>
            <div style={{ flex: "1 1 calc(33.33% - 20px)", minWidth: "300px", padding: "15px", background: "#f9f9f9", 
          borderRadius: "15px", 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"  }}>
              <Pie data={lambdadata1} options={pieOptions} />
            </div>
          </div>
        </div>
      )}

      {activeTab === "lambda" && (
        <div>
          <h1>Lambda Charts</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          <div style={{ flex: "1 1 calc(33.33% - 20px)", minWidth: "300px", padding: "15px", background: "#f9f9f9", 
          borderRadius: "15px", 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
              <Pie data={lambdadata1} options={pieOptions} />
            </div>
            <div style={{ flex: "1 1 calc(33.33% - 20px)", minWidth: "300px", padding: "15px", background: "#f9f9f9", 
          borderRadius: "15px", 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"  }}>
              <Pie data={lambdadata2} options={pieOptions2} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartSample;
