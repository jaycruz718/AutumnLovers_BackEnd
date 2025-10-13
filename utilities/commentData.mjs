const commentsSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default [
  {
    userId: 1,
    title: "First comment",
    content: "Nice post! Very helpful.",
  },
  {
    userId: 2,
    title: "Second comment",
    content: "Thanks for sharing this!",
  },
];
