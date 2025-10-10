// Import
import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./db/conn.mjs";


// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// DB Connection
connectDB();

// Middleware


//Routes


// Err Handling Middleware


// Listener
app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`)
});
