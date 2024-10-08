const express = require("express");
const router = express.Router();
const {
  seedDatabase,
  listTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
} = require("../controllers/transactionController");

// Seed database route
//http://localhost:5000/api/seed
router.get("/seed", seedDatabase);

// Transactions listing route
//http://localhost:5000/api/transactions?month=March
router.get("/transactions", listTransactions);

// Statistics route
//http://localhost:5000/api/statistics?month=March
router.get("/statistics", getStatistics);

// Bar chart route
//http://localhost:5000/api/barchart?month=March
router.get("/barchart", getBarChartData);

// Pie chart route
//http://localhost:5000/api/piechart?month=March
router.get("/piechart", getPieChartData);

module.exports = router;
