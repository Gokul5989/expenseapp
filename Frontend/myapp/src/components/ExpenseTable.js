import { useState, useEffect } from "react";
import "./ExpenseForm.css";
function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch data initially
    fetchExpenses();

    // Set an interval to refresh the data every 30 seconds (30000 milliseconds)
    const intervalId = setInterval(fetchExpenses, 30000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/expenses");
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Calculate total amount
 

  return (
    <div>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.name}</td>
              <td>{expense.amount.toFixed(2)}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
}

export default ExpenseTable;
