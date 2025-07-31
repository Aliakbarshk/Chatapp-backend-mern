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
        required:false
        
    }

})


const User = mongoose.model("User", userSchema);