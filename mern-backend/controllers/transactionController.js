const axios = require("axios");
const Transaction = require("../models/Transaction");

// Fetchching and seed the database with data from the third-party API
const seedDatabase = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;

    // Cleaneaning the data before inserting
    const cleanedTransactions = transactions.map((transaction) => {
      return {
        title: transaction.title,
        description: transaction.description,
        price: transaction.price,
        dateOfSale: new Date(transaction.dateOfSale),
        category: transaction.category,
        sold: transaction.sold,
      };
    });

    await Transaction.deleteMany({});
    await Transaction.insertMany(cleanedTransactions);

    res.status(200).json({ message: "Database seeded successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error seeding the database", error });
  }
};

// Listing transactions with search and pagination
//http://localhost:5000/api/transactions?month=March
const listTransactions = async (req, res) => {
  try {
    const { month, search = "", page = 1, perPage = 10 } = req.query;

    const monthNumber = new Date(`${month} 1, 2023`).getMonth() + 1;

    const searchQuery = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber], // Match month regardless of year
      },
    };

    if (search) {
      searchQuery.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * perPage;

    // fetching transactions from the database
    const transactions = await Transaction.find(searchQuery)
      .skip(skip)
      .limit(parseInt(perPage));

    // total count for pagination
    const totalCount = await Transaction.countDocuments(searchQuery);

    res.status(200).json({
      transactions,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / perPage),
      totalCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// Statistics API: Total sale amount, sold items, and not sold items for the selected month
const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    const monthNumber = new Date(`${month} 1, 2023`).getMonth() + 1;

    const monthQuery = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber], // Match month regardless of year
      },
    };

    const transactions = await Transaction.find(monthQuery);

    const totalSaleAmount = transactions.reduce((acc, transaction) => {
      return transaction.sold ? acc + transaction.price : acc;
    }, 0);

    const totalSoldItems = transactions.filter(
      (transaction) => transaction.sold
    ).length;
    const totalNotSoldItems = transactions.filter(
      (transaction) => !transaction.sold
    ).length;

    res.status(200).json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error });
  }
};

// Bar Chart API: Count of items in various price ranges for the selected month
const getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;

    const monthNumber = new Date(`${month} 1, 2023`).getMonth() + 1;

    const monthQuery = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber], // Match month regardless of year
      },
    };

    const transactions = await Transaction.find(monthQuery);

    const priceRanges = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0,
    };

    transactions.forEach((transaction) => {
      const price = transaction.price;

      if (price <= 100) priceRanges["0-100"]++;
      else if (price <= 200) priceRanges["101-200"]++;
      else if (price <= 300) priceRanges["201-300"]++;
      else if (price <= 400) priceRanges["301-400"]++;
      else if (price <= 500) priceRanges["401-500"]++;
      else if (price <= 600) priceRanges["501-600"]++;
      else if (price <= 700) priceRanges["601-700"]++;
      else if (price <= 800) priceRanges["701-800"]++;
      else if (price <= 900) priceRanges["801-900"]++;
      else priceRanges["901-above"]++;
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bar chart data", error });
  }
};

// Pie Chart API: Count of items in each unique category for the selected month
const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    const monthNumber = new Date(`${month} 1, 2023`).getMonth() + 1;

    const monthQuery = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber],
      },
    };

    const transactions = await Transaction.find(monthQuery);

    const categoryCounts = {};

    transactions.forEach((transaction) => {
      const category = transaction.category;
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

    const result = Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pie chart data", error });
  }
};

module.exports = {
  seedDatabase,
  listTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
};
