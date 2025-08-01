import { generateToken } from "../Lib/utils.js";
import User from "../models/users.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const {fullName, email, password} = req.body;
  res.send('Signup route')
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();


    generateToken(newUser, newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

export const login = (req, res) => {
  res.send("Login route");
};

export const logout = (req, res) => {
  res.send("Logout route");
};
