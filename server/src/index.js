import dotenv from "dotenv";
import express from "express";
import cors from "cors";
//routes
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();


const app=express();
const PORT= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working");
});



app.use("/expenses",expenseRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
});

