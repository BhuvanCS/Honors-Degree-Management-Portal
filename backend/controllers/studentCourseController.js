import User from "../models/User.js";
import Course from "../models/Course.js";
import StudentCourse from "../models/StudentCourse.js";

export const addCourseToStudent = async (req, res) => {
  const { usn, courseId } = req.body;

  try {
    const student = await User.findOne({ usn });
    const course = await Course.findOne({ courseId });

    if (student && course) {
      if (req.user.role === "admin" || req.user.usn === usn) {
        //if student already has enrolled that course
        const isAlreadyEnrolled = student.courses.some(
          (enrolledCourseId) =>
            enrolledCourseId.toString().toLowerCase() ===
            course._id.toString().toLowerCase()
        );

        if (isAlreadyEnrolled) {
          return res
            .status(400)
            .json({ message: "Student is already enrolled in this course" });
        }

        const studentCourse = new StudentCourse({
          student: student._id,
          course: course._id,
          certificateLink: "",
          isCompleted: false,
        });

        await studentCourse.save();
        student.courses.push(course._id);
        course.students.push(student._id);

        await student.save();
        await course.save();

        res.status(201).json({
          message: "Course added to student",
        });
      } else {
        res.status(403).json({
          message: "You do not have permission to perform this action",
        });
      }
    } else {
      res.status(404).json({ message: "Student or course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadCertificate = async (req, res) => {
  const { usn, courseId, certificateLink } = req.body;

  try {
    const student = await User.findOne({ usn });
    const course = await Course.findOne({ courseId });

    if (!student || !course) {
      res.status(404).json({ message: "Student or course not found" });
    }
    if (req.user.role === "admin" || req.user.usn == usn) {
      const studentCourse = await StudentCourse.findOne({
        student,
        course,
      });

      if (studentCourse) {
        studentCourse.certificateLink = certificateLink;
        await studentCourse.save();
        res.status(200).json({ message: "Certificate uploaded succesfully!" });
      } else {
        res
          .status(404)
          .json({ message: "This student has not erolled to this course!" });
      }
    } else {
      res.status(403).json({
        message: "You do not have permission to perform this action",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyCourseCompletion = async (req, res) => {
  const { usn, courseId, isCompleted } = req.body;

  try {
    const student = await User.findOne({ usn });
    const course = await Course.findOne({ courseId });

    if (!student || !course) {
      return res.status(404).json({ message: "Student or course not found" });
    }
    if (req.user.role === "admin") {
      const studentCourse = await StudentCourse.findOne({
        student,
        course,
      });
      if (studentCourse) {
        studentCourse.isCompleted = isCompleted;
        await studentCourse.save();
        return res
          .status(200)
          .json({ message: "Course completion verified successfully!" });
      } else {
        return res
          .status(404)
          .json({ message: "This student has not erolled to this course!" });
      }
    } else {
      return res.status(403).json({
        message: "You do not have permission to perform this action",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getStudentProgressForCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findOne({ courseId });

    const studentCourses = await StudentCourse.find({ course })
      .populate("student")
      .populate("course");

    const progress = studentCourses.map((sc) => ({
      studentName: sc.student.name,
      usn: sc.student.usn,
      courseName: sc.course.name,
      certificateLink: sc.certificateLink,
      isCompleted: sc.isCompleted,
    }));

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStudentCourse = async (req, res) => {
  try {
    const studentcourses = await StudentCourse.find({})
      .populate("student")
      .populate("course");

    res.status(200).json(studentcourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
