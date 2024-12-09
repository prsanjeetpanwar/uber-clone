import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


export function generateAuthToken(user) {
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}



export async function comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}



export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}