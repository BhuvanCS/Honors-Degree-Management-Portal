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
          completionPercentage: 0, // Initial percentage
        });

        await studentCourse.save();
        student.courses.push(course._id);
        course.students.push(student._id);

        await student.save();
        await course.save();

        res.status(201).json({
          message: "Course added to student with initial completion percentage",
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

export const updateCompletionPercentage = async (req, res) => {
  const { usn, courseId, percentage } = req.body;

  try {
    const student = await User.findOne({ usn });
    const course = await Course.findOne({ courseId });

    if(!student || !course) {
        res.status(404).json({ message: "Student or course not found" });
    }
    if (req.user.role === "admin" || req.user.usn == usn) {
      const studentCourse = await StudentCourse.findOne({
        student,
        course,
      });

      if (studentCourse) {
        studentCourse.completionPercentage = percentage;
        await studentCourse.save();
        res.status(200).json({ message: "Completion percentage updated" });
      } else {
        res
          .status(404)
          .json({ message: "This student has not erolled to this course!" });
      }
    }
    else {
        res.status(403).json({
            message: "You do not have permission to perform this action",
          });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      completionPercentage: sc.completionPercentage,
      courseName: sc.course.name,
    }));

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
