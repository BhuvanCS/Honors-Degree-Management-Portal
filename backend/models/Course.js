import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseId: {type: 'string', required: true, unique: true, index: true},
    name: { type: String, required: true },
    subject: { type: String, required: true},
    professor: { type: String},
    institute: { type: String},
    description: { type: String },
    duration: { type: Number, required: true},
    credits: {type: Number, required: true},
    startdate: { type: Date, required: true},
    enddate: { type: Date, required: true},
    examdate: { type: Date, required: true},
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
