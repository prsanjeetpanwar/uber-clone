import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


export function generateAuthToken() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}



export async function compressPassword(){
 return await bcrypt.hash(this.password, 10);
    
}


export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}