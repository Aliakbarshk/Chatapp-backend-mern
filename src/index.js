import express from "express";
import authRoutes from "./routes/auth.route.js";
import {connectDB} from "./Lib/db.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

import cors from "cors";
app.use(cors());


app.use("/api/auth", authRoutes);




dotenv.config();
let port = 3000



console.log(port)


app.listen(port, () => {
  console.log(`Server is running on port ${port} == http://localhost:${port}`);

  connectDB();
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});