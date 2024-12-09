import mongoose from "mongoose";

const blacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 86400, 
    },
});

const blackListModel= mongoose.model('Blacklist', blacklistedTokenSchema);
export default blackListModel

