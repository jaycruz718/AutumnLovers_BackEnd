import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    
    birthday:{
        type: String,
        required: true,
    },
    bio: {
      type: String,
      maxlength: 300,
      default: "",
    },
    avatar: {
      type: String, // URL to profile image
      default: "",
    },
    social: {
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
    dateJoined: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // optional: adds createdAt and updatedAt fields
);

export default mongoose.model("User", userSchema);
