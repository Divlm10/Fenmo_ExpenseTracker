const API_URL = "https://fenmo-expensetracker.onrender.com";

export const fetchExpenses = async (query = "") => {
  const res = await fetch(`${API_URL}/expenses${query}`);
  if (!res.ok) throw new Error("Failed to fetch expenses");
  return res.json();
};

export const createExpense = async (data) => {
  const res = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "idempotency-key": crypto.randomUUID()
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Failed to create expense");
  return res.json();
};
