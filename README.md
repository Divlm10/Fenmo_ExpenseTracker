# Fenmo_ExpenseTracker

Expense Tracker – Full Stack (PERN)

This is a minimal full-stack expense tracking application built as part of a time-bound assessment.

The goal was to build something small but production-minded, focusing on correctness, data safety, and real-world behavior rather than adding too many features.


OVERVIEW:
![Dashboard Screenshot](dashboard.png)
This application allows a user to:

-Add a new expense (amount, category, description, date)
-View all expenses
-Filter expenses by category
-Sort expenses by date (newest first)
-See the total amount of currently visible expenses

Tech Stack:
Backend

    Node.js
    Express
    PostgreSQL
    pg (node-postgres)

Frontend

    React (Vite)
    Fetch API

Project Structure:

server/
  src/
    controllers/
    routes/
    db/
    index.js

client/
  src/
    components/
    utils/
    App.jsx
    main.jsx


Data Model:

The expenses table:

id (UUID)

amount (INTEGER)

category (TEXT)

description (TEXT)

date (DATE)

created_at (TIMESTAMP)

idempotency_key (TEXT, UNIQUE)

How to Run Locally:
Backend
cd server
npm install
npm run dev


Make sure PostgreSQL is running and update .env with:

DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/Expense_tracker

Frontend
cd client
npm install
npm run dev

Money Handling Decision:

Amounts are stored as integer paise, not floating point values.

Example:

₹120.50 => stored as 12050
Floating point numbers can introduce precision errors when dealing with money. Storing currency as the smallest unit (paise) avoids rounding issues and is a safer long-term approach.


The POST /expenses endpoint supports idempotency using an idempotency-key header.

The GET /expenses endpoint supports:

?category=Food

?sort=date_desc

Testing:
The system was tested for:

Normal expense creation
Rapid clicking / duplicate submissions
Network throttling
Page refresh after submission
Filtering and sorting combinations
Negative amount validation
Missing required fields
Expenses persist correctly in PostgreSQL and reload after refresh.

Possible Improvements:

Add authentication (per-user expenses)

Add pagination for large datasets

Add summary view (total per category)

Add automated tests