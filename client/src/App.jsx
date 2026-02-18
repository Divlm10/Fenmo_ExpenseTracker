import { useEffect, useState } from "react";
import { fetchExpenses } from "./utils/api.js";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";


function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filterCategory, setFilterCategory] = useState("");
  const [sortByDate, setSortByDate] = useState(false);

  //query string based on filter + sort
  const buildQuery = () => {
    const params = [];

    if (filterCategory) {
      params.push(`category=${filterCategory}`);
    }

    if (sortByDate) {
      params.push("sort=date_desc");
    }

    return params.length > 0 ? `?${params.join("&")}` : "";
  };

  const loadExpenses = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchExpenses(buildQuery());
      setExpenses(data);
    } catch (err) {
      setError("Failed to load expenses",err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    loadExpenses();
  }, [filterCategory, sortByDate]);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <ExpenseForm onExpenseCreated={loadExpenses} />

      <hr style={{ margin: "30px 0" }} />

      <ExpenseList
        expenses={expenses}
        loading={loading}
        error={error}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        sortByDate={sortByDate}
        setSortByDate={setSortByDate}
      />
    </div>
  );
}

export default App;
