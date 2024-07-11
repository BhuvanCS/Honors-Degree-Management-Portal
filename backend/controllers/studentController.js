import StudentCourse from "../models/StudentCourse.js";
import User from "../models/User.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).populate('courses');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentProfile = async (req, res) => {
  const { usn } = req.params;
  try {
    const student = await User.findOne({ usn }).populate('courses');

    if (student) {
      const studentCourses = await StudentCourse.find({
        student: student._id,
      }).populate("course");
      const courses = studentCourses.map((sc) => ({
        course: sc.course,
        certificateLink: sc.certificateLink,
        isCompleted: sc.isCompleted
      }));

      const profile = {
        usn: student.usn,
        name: student.name,
        email: student.email,
        cgpa: student.cgpa,
        role: student.role,
        courses: courses,
      };

      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudentStatus = async (req, res) => {
  const { usn, isAccepted } = req.body;

  try {
    const student = await User.findOne({ usn });
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.isAccepted = isAccepted;
    await student.save();

    res.status(200).json({ message: "Student status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { usn } = req.body;
  try {
    const student = await User.findOne({ usn });
    if (!student) return res.status(404).json({ message: "Student not found" });

    await student.deleteOne();

    res.status(200).json({ message: "Student record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};