// Import
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from "./db/conn.mjs";
import { globalErr, log } from "./middleware/middleware.mjs";

// Routes
import userRoutes from "./routes/userRoutes.mjs";
import postRoutes from "./routes/postRoutes.mjs";
import eventsRoutes from "./routes/eventsRoutes.mjs"
import contactRoutes from './routes/contactRoutes.mjs';


// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// DB Connection
connectDB();

// Middleware
app.use(express.json());
app.use(log);
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


//Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/contact", contactRoutes); 


// Err Handling Middleware
app.use(globalErr);

// Listener
app.get("/", (req, res) => {
  res.send("Server is running! Use /api/post");
});

app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`)
});
