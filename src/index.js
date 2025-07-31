import express from "express";
import authRoutes from "./routes/auth.route.js";
import {connectDB} from "./Lib/db.js";
import mongoose from "mongoose";
const app = express();



app.use("/api/auth", authRoutes);

app.use(express.json())


try{
  mongoose.connect(process.env.MONGODB_URI)
  console.log("Connected to MongoDB")
}
catch(error){
  console.log("Oh No database has a problem")
}



app.listen(80 || 3000, () => {
  console.log("Server is running on port 5001 == http://localhost:80");
  connectDB();
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});