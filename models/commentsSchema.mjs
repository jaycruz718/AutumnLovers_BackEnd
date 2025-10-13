import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    userId: {
        type: Number, 
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.model("Comment", commentsSchema);
export default Comment;
