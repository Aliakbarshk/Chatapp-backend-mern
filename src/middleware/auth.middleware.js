import { jwt } from "jsonwebtoken";
import { User } from "../models/User";


export const protectRoute = async (req , res , next) => {
    try{
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message: "Unauthorized access no token will be provided"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message: "Unauthorized access no token will be provided"})
        }
        const user = await User.findById(decoded.userid).select("-password");
        
        if(!user){
            return res.status(401).json({message: "User not found"})
        }
        req.user = user
        next()
    }
    catch(error){
        return res.status(401).json({msg : "Please log in to access this route"})
        console.log()
    } 
} 