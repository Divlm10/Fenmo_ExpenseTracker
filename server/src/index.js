require("dotenv").config();
const express=require("express");
const cors= require("cors");

const expenseRoutes= require();

const app=express();

const PORT= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/expenses",expenseRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
});

