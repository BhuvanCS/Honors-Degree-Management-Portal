import mongoose from "mongoose";

const studentCourseSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  certificateLink: {
    type: String,
    default: "",
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const StudentCourse = mongoose.model("StudentCourse", studentCourseSchema);
export default StudentCourse;
