import express from "express";
import authRoutes from "./routes/auth.route.js";
import {connectDB} from "./Lib/db.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();



app.use("/api/auth", authRoutes);

app.use(express.json())


dotenv.config();
let port = 3000


try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Database connection failed:", error);
}


console.log(port)


app.listen(port, () => {
  console.log(`Server is running on port ${port} == http://localhost:${port}`);

  connectDB();
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});