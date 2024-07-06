import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  usn: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  name: { type: String, required: true},
  cgpa: { type: Number, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  isAccepted: { type: Boolean, default: false },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const User = mongoose.model('User', userSchema);
export default User;
