-- DATABASE creation
CREATE DATABASE expense_tracker;

-- expense tracker main table
CREATE TABLE expenses (
    id UUID PRIMARY KEY,
    amount INTEGER NOT NULL,  -- stored in paise
    category TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    idempotency_key TEXT UNIQUE
);
