import express from "express";
const router=express.Router();

import { createExpense, getExpenses } from "../controllers/expenseController.js";

console.log("Expense routes file loaded");

// router.get("/test", (req, res) => {
//   res.send("Test route working");
// });
// router.post("/testpost", (req, res) => {
//   res.send("POST route works");
// });

router.post("/",createExpense);
router.get("/",getExpenses);

export default router;