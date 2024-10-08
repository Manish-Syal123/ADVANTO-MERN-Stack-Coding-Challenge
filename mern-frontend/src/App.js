import React, { useState } from "react";
import TransactionTable from "./components/TransactionTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

function App() {
  const [month, setMonth] = useState("March");

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "32px",
          color: "#333",
        }}
      >
        MERN Stack Transaction Dashboard
      </h1>
      <select
        onChange={handleMonthChange}
        value={month}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "200px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <PieChart month={month} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <BarChart month={month} />
      </div>
      <Statistics month={month} />
      <TransactionTable month={month} />
    </div>
  );

  // return (
  //   <div>
  //     <h1>MERN Stack Transaction Dashboard</h1>
  //     <PieChart month="March" />
  //     <Statistics month="March" />
  //     <TransactionTable month="March" />
  //     <BarChart month="March" />
  //   </div>
  // );
}

export default App;
