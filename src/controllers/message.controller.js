export const getUserForSidebar = async (req,res) => {
try{
    const loggedInUserId = req.user._id
    const filteredUser = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

    res.status(200).json(filteredUser)
}
catch(error){
    console.error("error in getting set user from sidebar")
    res.status(500).json({error:"internal server error"})
}



};


export const getMessages = async(req,res) => {
    try{const

    }