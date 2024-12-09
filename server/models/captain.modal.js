import mongoose from "mongoose";

const CaptainSchema = new mongoose.Schema({
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, 'Firstname must be at least 3 characters long'],
      },
      lastname: {
        type: String,
        minlength: [3, 'Lastname must be at least 3 characters long'],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        minlength: [3, 'Color must be at least 3 characters long'],
      },
      plate: {
        type: String,
        required: true,
        minlength: [3, 'Plate must be at least 3 characters long'],
      },
      capacity: {
        type: Number,
        required: true,
        min: [1, 'Capacity must be at least 1 person'],
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ['car', 'motorcycle', 'auto'],
      },
    },
  });
const CaptainModel=mongoose.model('Captain',CaptainSchema)
export default CaptainModel