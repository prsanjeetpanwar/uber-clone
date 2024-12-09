import { CreateUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import { generateAuthToken, hashPassword,comparePassword} from "../helper/index.js";
import userModel from "../models/user.models.js"; 
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import blackListModel from "../models/blackList.model.js";

export const RegisterUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const user = await CreateUser({
      firstname: fullname.firstname.trim(),
      lastname: fullname.lastname.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    const token = generateAuthToken(user);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user
    });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const LoginUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { email ,password} = req.body;

  try {
    const user = await userModel.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateAuthToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const GetUserProfile=async(req,res,next)=>{
  try{
         
    const user = await userModel.findById(req.user._id).select("-password");
    res.status(200).json({user});
  
  }

  catch(err){
    console.error("Error fetching user profile:", err);
  }

}


export const LogoutUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }

    res.clearCookie("token");

    await blackListModel.create({ token });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Error logging out user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};




















