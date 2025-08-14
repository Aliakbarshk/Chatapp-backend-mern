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



export const sendMessage = async(req,res) => {
    try{
        const{text,image}= req.body;
        const{id:receiverId}= req.param;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const message = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })
    }
    catch(error){}
}

//just to maintain green
//just to maintain green