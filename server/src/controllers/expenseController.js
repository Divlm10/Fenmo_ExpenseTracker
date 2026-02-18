import pool from "../db/db.js";
import { v4 as uuidv4 } from "uuid";

const createExpense= async(req,res)=>{
    try{
        const {amount,category,description,date}=req.body;
        const idempotencyKey = req.headers["idempotency-key"];

        if(amount===undefined || !category || !date){
            return res.status(400).json({
                error: "amount, category and date are required"
            });
        }
        if(!idempotencyKey){
            return res.status(400).json({
                error: "Idempotency-Key header is required"
            });
        }

        if(amount<0){
            return res.status(400).json({
                error: "Amount cannot be negative"
            });
        }
        //rupees =>pasise
        const amountPaise= Math.round(amount *100);

        const existingExpense=await pool.query(
            "SELECT * FROM expenses WHERE idempotency_key=$1",
            [idempotencyKey]
        );

        if(existingExpense.rows.length >0){
            return res.status(200).json(existingExpense.rows[0]);//already exists
        }

        //insert New
        const newExpense=await pool.query(
            `INSERT INTO expenses (id,amount,category,description,date,idempotency_key)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [
                uuidv4(),
            amountPaise,
            category,
            description || null,
            date,
            idempotencyKey
            ]
        );
        return res.status(201).json(newExpense.rows[0]);

    }catch(error){
        console.error("Error creating Expense:",error);
        return res.status(500).json({
            error: "INTERNAL SERVER ERROR"
        });
    }
};

// module.exports={createExpense};


const getExpenses=async(req,res) =>{
    try{
        const {category,sort}=req.query;

        let base="SELECT * FROM expenses";
        const params=[];

        if(category){
            base += " WHERE category=$1";
            params.push(category);
        }

        if(sort==="date_desc"){
            //newest date req
            base += " ORDER BY date desc";
        }
        
        const{rows}=await pool.query(base,params);
        res.status(200).json(rows);
    }catch(error){
        console.error("GET /expenses failed:", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};

export { createExpense, getExpenses };