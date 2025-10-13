import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      lowercase: true,
      trim: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: true, 
    },
    
    isAdmin: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ userName: 1 });

export default mongoose.model("User", userSchema);