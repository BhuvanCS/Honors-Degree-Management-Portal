import mongoose from 'mongoose';

const studentCourseSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    completionPercentage: { type: Number, default: 0, min: 0, max: 100 },
  });
  
const StudentCourse = mongoose.model('StudentCourse', studentCourseSchema);
export default StudentCourse;
  