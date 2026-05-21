import jwt from "jsonwebtoken"
import { clearAuthCookie } from "../utils/authCookie.js"
const isAuth=async (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization || ""
        const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : ""
        let token=bearerToken || req.cookies.token
        if(!token){
            return res.status(401).json({message:"Please log in to continue."})
        }

        let verifyToken=  jwt.verify(token,process.env.JWT_SECRET)
        req.userId=verifyToken.userId
        next()


    } catch (error) {
        if(error.name==="JsonWebTokenError" || error.name==="TokenExpiredError"){
            clearAuthCookie(req, res)
            return res.status(401).json({message:"Session expired. Please log in again."})
        }
        console.log(error)
        return res.status(500).json({message:`isauth error ${error}`})
    }
}

export default isAuth
