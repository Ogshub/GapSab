import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { clearAuthCookie, getAuthCookieOptions } from "../utils/authCookie.js"

const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const getPublicUser = async (userId) => {
    return User.findById(userId).select("-password")
}

export const signUp=async (req,res)=>{
   try {
    const userName=req.body?.userName?.trim()
    const email=req.body?.email?.trim().toLowerCase()
    const password=req.body?.password?.trim()

    if(!userName || !email || !password){
        return res.status(400).json({message:"username, email and password are required"})
    }

    const checkUserByUserName=await User.findOne({
        userName:{$regex:`^${escapeRegex(userName)}$`,$options:"i"}
    })
    if(checkUserByUserName){
        return res.status(409).json({message:"username already exists"})
    }
    const checkUserByEmail=await User.findOne({email})
    if(checkUserByEmail){
        return res.status(409).json({message:"email already exists"})
    }
if(password.length<6){
    return res.status(400).json({message:"password must be at least 6 characters"})
}

const hashedPassword=await bcrypt.hash(password,10)

const user=await User.create({
    userName,email,password:hashedPassword
})

const token=await genToken(user._id)
const publicUser = await getPublicUser(user._id)

res.cookie("token",token,{
    maxAge:7*24*60*60*1000,
    ...getAuthCookieOptions(req)
   })

   return res.status(201).json({user:publicUser, token})


   } catch (error) {
    return res.status(500).json({message:`signup error ${error}`})
   } 
}
export const login=async (req,res)=>{
    try {
     const identifier=req.body?.email?.trim()
     const password=req.body?.password?.trim()

     if(!identifier || !password){
        return res.status(400).json({message:"email or username and password are required"})
     }

     const normalizedEmail = identifier.toLowerCase()
     const user=await User.findOne({
        $or:[
            {email:normalizedEmail},
            {userName:{$regex:`^${escapeRegex(identifier)}$`,$options:"i"}}
        ]
     })
     if(!user){
         return res.status(400).json({message:"account does not exist"})
     }

 const isMatch=await bcrypt.compare(password,user.password)
 if(!isMatch){
    return res.status(400).json({message:"incorrect password"})
 }
 
 const token=await genToken(user._id)
 const publicUser = await getPublicUser(user._id)
 
 res.cookie("token",token,{
     maxAge:7*24*60*60*1000,
     ...getAuthCookieOptions(req)
    })
 
    return res.status(200).json({user:publicUser, token})
 
 
    } catch (error) {
     return res.status(500).json({message:`login error ${error}`})
    } 
 }

 export const logOut=async (req,res)=>{
    try {
        clearAuthCookie(req, res)
        return res.status(200).json({message:"log out successfully"})
    } catch (error) {
        return res.status(500).json({message:`logout error ${error}`})
    }
 }
