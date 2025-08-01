import { generateToken } from "../Lib/utils.js";
import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../Lib/cloudinary.js";



export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(400).json({ message: "Upar wala code nhi chalra" });
  }
};




export const login = async (req, res) => {
   const { email, password } = req.body;
   try{
    const user = await User.findOne({email})

    if(!user){
      return res.status(400).json({message: "Invalid credential" })
    }
    const isPasswordCorrect = await bcrypt.compare(password , user.password)

    if(!isPasswordCorrect) {
      return res.status(400).json({message: "Invalid credential" })
    } 
    generateToken(user._id,res)
    res.status(200).json({
      _id:user._id,
      fullName:user.fullName,
      email:user.email,
      profilePic:user.profilePic,
    });


   }
   catch(error){
    console.log("Error login in please contact admin", error.message);
   }
};

export const logout = (req, res) => {
  try{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message: "logged out successfully⚙️" })
  }
  catch(error){
    console.log(
      "⚠️⚠️⚠️⚠️⚠️Cannot logout contact the admin⚠️⚠️⚠️⚠️⚠️",
      error.message
    ); 
    res.status(500).json({message:"Server Error⚙️⚠️"})
  }
};

export const updateProfile = async (req, res) => {
  try{
    const {profilePic} = req.body;
    const userId = req.user._id;
    if(!profilepic){
      return res.status(400).json({message: "Please provide a profile picture" })
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url},{new:true})
  }
  catch(error){

  }
}
