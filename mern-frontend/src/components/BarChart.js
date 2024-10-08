import React, { useEffect, useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Items",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/barchart`, {
          params: { month },
        });

        console.log(response.data);

        const priceRanges = Object.keys(response.data);
        const dataValues = Object.values(response.data);

        const data = {
          labels: priceRanges,
          datasets: [
            {
              label: "Number of Items",
              data: dataValues,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchBarChartData();
  }, [month]);

  return (
    <div>
      <h2>Bar Chart for {month}</h2>
      {chartData.labels.length > 0 ? (
        <Bar
          data={chartData}
          options={{ responsive: true }}
          width={700}
          height={400}
        />
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </div>
  );
};

export default BarChart;
