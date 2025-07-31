import mongoose from 'mongoose';


export const connectDB = async () => {
    try { 
        const conn = mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected successfully :D")
    }
    catch(err){
        console.log("Error connecting to database :( ")
    }



}