const express = require("express");
const router = express.Router();
const Ledger = require("../models/Ledger");

/*
    Routes for CRUD operations
*/
// Home route: List all transactions
router.get("/", async (req, res) => {
  // get items
  try {
    const transactions = await Ledger.findAll({ order: [["date", "DESC"]] });
    res.render("index", { transactions, pageTitle: "Home Page" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Route to add a new transaction
router.post("/add", async (req, res) => {
  const { description, debit, credit } = req.body;

  // Get the latest balance
  // TODO: Your Code
  const lastTransaction = await Ledger.findOne({
    order: [["createdAt", "DESC"]],
  });

  let previousBalance = lastTransaction ? lastTransaction.balance : 0;

  // Calculate new balance
  // TODO: Your Code
  const debitTotal = parseFloat(debit) || 0;
  const creditTotal = parseFloat(credit) || 0;
  const newBalance = previousBalance + creditTotal + debitTotal;
  console.log(`This is the latest balance: ${previousBalance}`);

  // Add transaction
  await Ledger.create({
    description,
    debit: debit || 0,
    credit: credit || 0,
    balance: newBalance,
  });

  res.redirect("/");
});

/*
    Routes for page navigation
*/

module.exports = router;
