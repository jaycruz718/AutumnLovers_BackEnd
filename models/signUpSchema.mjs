import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema(
  {
    firstName: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        lowercase: true,
    },

    lastName: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        lowercase: true,
    },

    userName: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      lowercase: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true, 
    },

    password2: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("signUp", signUpSchema);