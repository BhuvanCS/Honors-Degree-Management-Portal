import User from '../models/User.js';

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudentStatus = async (req, res) => {
  const { studentId, isAccepted } = req.body;

  try {
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.isAccepted = isAccepted;
    await student.save();

    res.status(200).json({ message: 'Student status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
