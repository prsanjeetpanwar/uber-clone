import { validationResult } from "express-validator";
import CaptainModel from "../models/captain.modal.js";
import { hashPassword,generateAuthToken, comparePassword } from "../helper/index.js";
import blackListModel from "../models/blackList.model.js";



export const RegisterCaptain =async(req,res,next)=>{
     const error=validationResult(req);
     if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
     }

     const { fullname,email,password,vehicle}=req.body;
  const hashedPassword = await hashPassword(password);


     const IsCaptainAlreadyExist= await CaptainModel.findOne({email});
     try{
        if(IsCaptainAlreadyExist){
            return res.status(400).json({error:"Captain already exist"});
        }

        const captain=await CaptainModel.create({
         fullname: {
            firstname: fullname.firstname.trim(),
            lastname: fullname.lastname.trim()
          },
            email:email.trim().toLowerCase(),
            password:hashedPassword,
            vehicle: {
               color: vehicle.color,
               plate: vehicle.plate,
               capacity: vehicle.capacity,
               vehicleType: vehicle.vehicleType
             }
        });

        const token =generateAuthToken(captain);

        res.status(201).json({message:" Captain registered successfully",token,captain})

     }
     catch(err){
        console.error("Error registering captain:",err.message);
        res.status(500).json({ error: "Internal server error" });



     }
}

export const LoginCaptain = async (req, res) => {
   const error = validationResult(req);
   if (!error.isEmpty()) {
     return res.status(400).json({ errors: error.array() });
   }
 
   const { email, password } = req.body;
 
   try {
 
     const captain = await CaptainModel.findOne({ email: email.trim().toLowerCase() }).select('+password');
     if (!captain) {
       return res.status(401).json({ message: "Invalid credentials" });
     }
 
 
     const isPasswordMatch = await comparePassword(password, captain.password);
     if (!isPasswordMatch) {
       return res.status(401).json({ message: "Invalid credentials" });
     }
 
     const token = generateAuthToken(captain);
     res.status(200).json({
       message: "Captain logged in successfully",
       token,
       captain,
     });
   } catch (err) {
     console.error("Error logging inn captain:", err.message);
     res.status(500).json({ error: "Internal server error" });
   }
 };

 export const GetCaptainProfile=async(req,res,next)=>{
  try{
    const captain=await CaptainModel.findById(req.captain._id).select('-password');
    if(!captain){
      return res.status(404).json({error:"Captain not found"});
    }
    res.status(200).json({captain});
    }catch(err){
      console.error("Error getting captain profile:",err.message);
      res.status(500).json({error:"Internal server error"});
    }
 }

 export const LogoutCaptain=async (req,res)=>{
  try{
   const token=req.cookies?.token || req.headers.authorization?.split(' ')[1]
   if(!token){
    return res.status(401).json({error:"Unauthorized"})
   }
   res.clearCookie("token");
   await blackListModel.create({token})
   res.status(200).json({message:"Logged out successfully"})
  }
  catch(err){
   console.error("Error logging out captain:",err.message);
   res.status(500).json({error:"Internal server error"});
  }
 }


