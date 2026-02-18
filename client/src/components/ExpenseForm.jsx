import { useState } from "react";
import { createExpense } from "../utils/api";

function ExpenseForm({ onExpenseCreated }) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createExpense({
        ...formData,
        amount: Number(formData.amount)
      });

      //Reset form after success
      setFormData({
        amount: "",
        category: "",
        description: "",
        date: ""
      });

      onExpenseCreated();

    } catch (err) {
      setError("Failed to create expense",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Expense"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

      </form>
    </div>
  );
}

export default ExpenseForm;
