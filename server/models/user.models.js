import mongoose from "mongoose";



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
        select:true,

    },
    socketId:{
        type:String,

    },

})


const userModel=mongoose.model('user',userSchema)

export default userModel

