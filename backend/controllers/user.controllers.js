import { deleteFromCloudinary, uploadOnCloudinary } from "../config/cloudinary.js"
import User from "../models/user.model.js"
import { clearAuthCookie } from "../utils/authCookie.js"

const clearSessionAndRespond = (req, res) => {
    clearAuthCookie(req, res)
    return res.status(401).json({message:"Session expired. Please log in again."})
}

export const getCurrentUser=async (req,res)=>{
try {
    let user=await User.findById(req.userId).select("-password")
    if(!user){
        return clearSessionAndRespond(req, res)
    }

    return res.status(200).json(user)
} catch (error) {
    return res.status(500).json({message:`current user error ${error}`})
}
}

export const editProfile=async (req,res)=>{
    try {
        const existingUser = await User.findById(req.userId).select("_id imagePublicId")
        if(!existingUser){
            return clearSessionAndRespond(req, res)
        }

        let {name}=req.body
        let updateData = {}
        if(name) updateData.name = name
        if(req.file){
            const uploadResult = await uploadOnCloudinary(req.file.path, "gapsab/profile-images")
            updateData.image = uploadResult.url
            updateData.imagePublicId = uploadResult.publicId

            if(existingUser.imagePublicId){
                try {
                    await deleteFromCloudinary(existingUser.imagePublicId)
                } catch (error) {
                    console.log("Previous profile image delete error:", error.message || error)
                }
            }
        }
        let user=await User.findByIdAndUpdate(req.userId, updateData, {new:true}).select("-password")

        if(!user){
            return clearSessionAndRespond(req, res)
        }

        return res.status(200).json(user)
    } catch (error) {
        if(req.file){
            return res.status(500).json({message:`profile image upload failed: ${error.message || error}`})
        }
        return res.status(500).json({message:`profile error ${error.message || error}`})
    }
}

export const getOtherUsers=async (req,res)=>{
    try {
        const existingUser = await User.findById(req.userId).select("_id")
        if(!existingUser){
            return clearSessionAndRespond(req, res)
        }

        let users=await User.find({
            _id:{$ne:req.userId}
        }).select("-password")
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:`get other users error ${error}`})
    }
}

export const search =async (req,res)=>{
    try {
        const existingUser = await User.findById(req.userId).select("_id")
        if(!existingUser){
            return clearSessionAndRespond(req, res)
        }

        let {query}=req.query
        if(!query){
            return res.status(400).json({message:"query is required"})
        }
        let users=await User.find({
            $or:[
                {name:{$regex:query,$options:"i"}},
                {userName:{$regex:query,$options:"i"}},
            ]
        })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:`search users error ${error}`})
    }
}
