const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: String,
    duration: Number,
    topic: String,
    tas: [String],
    teacher: String,
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium"
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
