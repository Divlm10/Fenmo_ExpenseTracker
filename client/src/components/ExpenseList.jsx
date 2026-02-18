function ExpenseList({
  expenses,
  loading,
  error,
  filterCategory,
  setFilterCategory,
  sortByDate,
  setSortByDate
}) {

  //total (amount in paise)
  const total = expenses.reduce((sum, exp) => {
    return sum + exp.amount;
  }, 0);

  return (
    <div>
      <h2>Expenses</h2>

      {/* Filter + Sort Controls */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Filter by category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        />

        <label style={{ marginLeft: "15px" }}>
          <input
            type="checkbox"
            checked={sortByDate}
            onChange={() => setSortByDate(!sortByDate)}
          />
          Sort by newest
        </label>
      </div>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error State */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Expense List */}
      {!loading && expenses.length === 0 && (
        <p>No expenses found.</p>
      )}

      {!loading && expenses.length > 0 && (
        <>
          <table className="expense-table">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Category</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => (
          <tr key={exp.id}>
            <td>₹{(exp.amount / 100).toFixed(2)}</td>
            <td>{exp.category}</td>
            <td>{exp.description || "-"}</td>
            <td>{exp.date}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="total">
      Total: ₹{(total / 100).toFixed(2)}
    </div>
        </>
      )}
    </div>
  );
}

export default ExpenseList;
