import User from "../models/users.model";
import bcrypt from 'bcryptjs';


export const signup = async (req, res) => {
    const { username, email, password } = req.body;
   try{
    if(password < 6) {
        return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }
   
   
   //same User detection
    const user = await User.findOne({email}) //FINDONE FIND THE SIMILAR ONES

    if(user) return res.status(400) .json({ msg: "User already exists" });
     
    

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        fullName,
        email,
        password:hashedPassword
    })

    if(newUser){

    }else{
        res.status(400).json({message: "Failed to create user/invalid user data" })
    }







   }
   catch(error){

   }
};

function hashedpasswordd(){
    const password = req.body.password ;
  
}

export const login = (req, res) => {
    res.send("Login route");
};

export const logout = (req, res) => {
    res.send("Logout route");
};
