import logo from './logo.svg';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';

function App() {
  return (
    <div className="App">
      <ExpenseForm/>
      <ExpenseTable/>
    </div>
  );
}

export default App;
