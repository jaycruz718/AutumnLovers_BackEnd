import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String, // Or you can use mongoose.Schema.Types.ObjectId if you have users
      default: "Guest",
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;