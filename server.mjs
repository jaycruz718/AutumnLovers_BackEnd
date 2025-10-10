// Import
import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./db/conn.mjs";
import { globalErr, log } from "./middleware/middleware.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import postRoutes from "./routes/postRoutes.mjs";


// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// DB Connection
connectDB();

// Middleware
app.use(express.json());
app.use(log);
//app.use(cors());

//Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Err Handling Middleware
app.use(globalErr);

// Listener
app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`)
});
