import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { generateAuthToken } from "../helper/authToken";


const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'firstName must be at least 3 characters long'],
        },
        lastname:{
            type:String,
            minlength:[3,'lastName must be at least 3 characters long'],
        }

    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[3,'email must be at least 3 characters long'],
    },
    password:{
        type:String,
        required:true,
        select:false

    },
    socketId:{
        type:String,

    },

})

userSchema.method('generateAuthToken',generateAuthToken)

