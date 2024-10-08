import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Items",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  });

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/piechart`, {
          params: { month },
        });

        if (Array.isArray(response.data) && response.data.length > 0) {
          const labels = response.data.map((item) => item.category);
          const dataValues = response.data.map((item) => item.count);

          const data = {
            labels: labels,
            datasets: [
              {
                label: "Number of Items",
                data: dataValues,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                ],
              },
            ],
          };

          setChartData(data);
        } else {
          console.error("No data available for the selected month");
        }
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchPieChartData();
  }, [month]);

  return (
    <div>
      <h2>Pie Chart for {month}</h2>
      {chartData.labels.length > 0 ? (
        <Pie
          options={{ responsive: true }}
          width={500}
          height={500}
          data={chartData}
        />
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </div>
  );
};

export default PieChart;
