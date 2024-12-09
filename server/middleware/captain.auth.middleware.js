import CaptainModel from "../models/captain.modal.js";
import jwt from "jsonwebtoken";

export const AuthCaptain=async (req,res, next)=>{

    try {
    const token=req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    const captain=await CaptainModel.findById(decoded._id).select('-password');
    
    if(!captain){
        return res.status(401).json({message:"Captain not found"});
    }
    req.captain=captain;
    next()
    }

    catch(err){
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expired" });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        }
        
        return res.status(500).json({ error: "Authentication failed" });

    }
}