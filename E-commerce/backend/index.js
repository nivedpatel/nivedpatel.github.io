import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/UserRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

// create an instance of the Express application.
const app = express();

// Mount the middlewares for parsing JSON, URL-encoded data, and cookies.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// setup the routes
app.use("/api/users", UserRoutes);

// Starts the server and listens on the specified port.
app.listen(port, () => console.log(`Server running on port: ${port}`));