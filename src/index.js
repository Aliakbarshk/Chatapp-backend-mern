import express from "express";
import authRoutes from "./routes/auth.route.js";
import {connectDB} from "./Lib/db.js";
const app = express();



app.use("/api/auth", authRoutes);

app.listen(80 || 3000, () => {
  console.log("Server is running on port 5001 == http://localhost:80");
  connectDB();
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});