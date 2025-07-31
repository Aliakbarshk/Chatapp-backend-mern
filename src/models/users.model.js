import mongoose from "mongoose";

const user = new mongoose.schema({
    email : {
        type : String,
        required : true,
        unique : true
        
    },
    fullname:{
        type:String,
        required:true
        
    },
    password:{
        type:String,
        required:true
        },
    profilePic:{
        type:String,
        default: "" ;
        
    }

},{timestamp : true})


const User = mongoose.model("User", userSchema);

export default User;