import React, { useEffect, useState } from "react";
import axios from "axios";

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await axios.get(`http://localhost:5000/api/statistics`, {
        params: { month },
      });
      setStats(response.data);
    };

    fetchStatistics();
  }, [month]);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Statistics for {month}
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "#007bff" }}>Total Sale Amount</h3>
          <p style={{ fontSize: "24px", color: "#333", fontWeight: "bold" }}>
            ${stats.totalSaleAmount.toFixed(2)}
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "#28a745" }}>Total Sold Items</h3>
          <p style={{ fontSize: "24px", color: "#333", fontWeight: "bold" }}>
            {stats.totalSoldItems}
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "#dc3545" }}>Total Not Sold Items</h3>
          <p style={{ fontSize: "24px", color: "#333", fontWeight: "bold" }}>
            {stats.totalNotSoldItems}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
