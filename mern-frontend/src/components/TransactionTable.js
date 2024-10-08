import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/transactions`,
        {
          params: { month, page, perPage, search },
        }
      );
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    };

    fetchTransactions();
  }, [month, page, search]);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Transaction Table
      </h2>
      <input
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "12px",
                backgroundColor: "#f4f4f4",
                borderBottom: "2px solid #ddd",
              }}
            >
              Title
            </th>
            <th
              style={{
                padding: "12px",
                backgroundColor: "#f4f4f4",
                borderBottom: "2px solid #ddd",
              }}
            >
              Description
            </th>
            <th
              style={{
                padding: "12px",
                backgroundColor: "#f4f4f4",
                borderBottom: "2px solid #ddd",
              }}
            >
              Price
            </th>
            <th
              style={{
                padding: "12px",
                backgroundColor: "#f4f4f4",
                borderBottom: "2px solid #ddd",
              }}
            >
              Date of Sale
            </th>
            <th
              style={{
                padding: "12px",
                backgroundColor: "#f4f4f4",
                borderBottom: "2px solid #ddd",
              }}
            >
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                {transaction.title}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                {transaction.description}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                ${transaction.price.toFixed(2)}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                {new Date(transaction.dateOfSale).toLocaleDateString()}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                {transaction.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Previous
        </button>
        <span style={{ fontSize: "16px", margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
