import { deleteFromCloudinary, uploadOnCloudinary } from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage=async (req,res)=>{
    try {
        let sender=req.userId
        let {receiver}=req.params
        let {message}=req.body

        if(!message?.trim() && !req.file){
            return res.status(400).json({message:"message or image is required"})
        }

        let image="";
        let imagePublicId="";
        if(req.file){
            const uploadResult=await uploadOnCloudinary(req.file.path, "gapsab/chat-images")
            image=uploadResult.url
            imagePublicId=uploadResult.publicId
        }

        let conversation=await Conversation.findOne({
            partcipants:{$all:[sender,receiver]}
        })

        let newMessage=await Message.create({
            sender,receiver,message:message?.trim() || "",image,imagePublicId
        })

        if(!conversation){
            conversation=await Conversation.create({
                partcipants:[sender,receiver],
                messages:[newMessage._id]
            })
        }else{
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }

        const receiverSocketId=getReceiverSocketId(receiver)
if(receiverSocketId){
    io.to(receiverSocketId).emit("newMessage",newMessage)
}


        
        return res.status(201).json(newMessage)
    
    } catch (error) {
        if(req.file){
            return res.status(500).json({message:`message image upload failed: ${error.message || error}`})
        }
        return res.status(500).json({message:`send Message error ${error.message || error}`})
    }
}

export const getMessages=async (req,res)=>{
    try {
        let sender=req.userId
        let {receiver}=req.params
        let conversation=await Conversation.findOne({
            partcipants:{$all:[sender,receiver]}
        }).populate("messages")

        return res.status(200).json(conversation?.messages || [])
    } catch (error) {
        return res.status(500).json({message:`get Message error ${error}`})
    }
}

export const deleteMessage=async (req,res)=>{
    try {
        const sender=req.userId
        const {messageId}=req.params

        const message = await Message.findById(messageId)
        if(!message){
            return res.status(404).json({message:"message not found"})
        }

        if(String(message.sender)!==String(sender)){
            return res.status(403).json({message:"you can delete only your own messages"})
        }

        if(message.imagePublicId){
            try {
                await deleteFromCloudinary(message.imagePublicId)
            } catch (error) {
                console.log("Message image delete error:", error.message || error)
            }
        }

        const conversation = await Conversation.findOneAndUpdate(
            { messages: message._id },
            { $pull: { messages: message._id } },
            { new: true }
        )

        if(conversation && conversation.messages.length===0){
            await Conversation.findByIdAndDelete(conversation._id)
        }

        await Message.findByIdAndDelete(messageId)

        const receiverSocketId=getReceiverSocketId(String(message.receiver))
        if(receiverSocketId){
            io.to(receiverSocketId).emit("messageDeleted",{messageId})
        }

        return res.status(200).json({message:"message deleted",messageId})
    } catch (error) {
        return res.status(500).json({message:`delete Message error ${error}`})
    }
}
