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
    try{
        const {id:userToChatId} = req.params
        const senderId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId:myId,receiverId:usertoChatId},
                {senderId:usertoChatId,receiverId:myId}
            ]
        })
        res.status(200).json(messages)
    } catch(error){
        console.log("error in getMessages controller", error.message);
        res.status(500).json({error:"Internal server error"})
    }
}

                