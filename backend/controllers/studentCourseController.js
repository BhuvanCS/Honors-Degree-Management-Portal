import User from '../models/User.js';
import Course from '../models/Course.js';
import StudentCourse from '../models/StudentCourse.js';

export const addCourseToStudent = async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    const student = await User.findById(studentId);
    const course = await Course.findById(courseId);

    if (student && course) {
      const studentCourse = new StudentCourse({
        student: student._id,
        course: course._id,
        completionPercentage: 0, // Initial percentage
      });

      await studentCourse.save();
      student.courses.push(course._id);
      course.students.push(student._id);

      await student.save();
      await course.save();

      res.status(201).json({ message: 'Course added to student with initial completion percentage' });
    } else {
      res.status(404).json({ message: 'Student or course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCompletionPercentage = async (req, res) => {
  const { studentId, courseId, percentage } = req.body;

  try {
    const studentCourse = await StudentCourse.findOne({
      student: studentId,
      course: courseId,
    });

    if (studentCourse) {
      studentCourse.completionPercentage = percentage;
      await studentCourse.save();
      res.status(200).json({ message: 'Completion percentage updated' });
    } else {
      res.status(404).json({ message: 'Student course relationship not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentProgressForCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const studentCourses = await StudentCourse.find({ course: courseId })
      .populate('student')
      .populate('course');

    const progress = studentCourses.map((sc) => ({
      studentName: sc.student.name,
      completionPercentage: sc.completionPercentage,
      courseName: sc.course.name,
    }));

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
