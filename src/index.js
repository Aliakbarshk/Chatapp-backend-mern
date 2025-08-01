import express from "express";
import authRoutes from "./routes/auth.route.js";
import {connectDB} from "./Lib/db.js";
import mongoose from "mongoose";
const app = express();



app.use("/api/auth", authRoutes);

app.use(express.json())


let port  = process.env.PORT


try{
  mongoose.connect(process.env.MONGODB_URI)
  console.log("Connected to MongoDB")
}
catch(error){
  console.log("Oh No database has a problem")
}



app.listen(port, () => {
  console.log(`Server is running on port 5001 == http://localhost:${port}`);
  connectDB();
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});