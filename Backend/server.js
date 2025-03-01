const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

// Create an Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURL = 'mongodb+srv://Gokulraj:Gokluraj5989@cluster0.hq9fg.mongodb.net/expensedb?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error("MongoDB connection error:", err));

// Create Expense Schema
const expenseSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: Date,
});

const Expense = mongoose.model("Expense", expenseSchema);

// Create expense
app.post("https://expenseapp-4.onrender.com/api/expenses", async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all expenses
app.get("https://expenseapp-4.onrender.com/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update expense
app.put("https://expenseapp-4.onrender.com/api/expenses/:id", async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete expense
app.delete("https://expenseapp-4.onrender.com/api/expenses/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server on port 3001
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
