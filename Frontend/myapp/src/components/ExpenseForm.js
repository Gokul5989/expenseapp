import { useState } from "react"
import "./ExpenseForm.css"


function ExpenseForm() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [expenses, setExpenses] = useState([]) // Maintain state inside this component

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newExpense = { name, amount: Number.parseFloat(amount), date }

    try {
      const response = await fetch("http://localhost:3001/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      })
      const data = await response.json()
      setExpenses([...expenses, data]) // Update state locally
    } catch (error) {
      console.error("Error adding expense:", error)
    }

    setName("")
    setAmount("")
    setDate("")
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input type="text" placeholder="Expense name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit">Add Expense</button>
    </form>
  )
}

export default ExpenseForm;