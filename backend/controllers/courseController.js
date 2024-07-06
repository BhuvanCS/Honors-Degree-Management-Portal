import Course from '../models/Course.js';
import User from '../models/User.js';

export const addCourse = async (req, res) => {
    const { courseId, name, subject, description, duration, credits, startdate, examdate } = req.body;
  
    try {
      const course = new Course({
        courseId,
        name,
        subject,
        description,
        duration,
        credits,
        startdate,
        examdate,
      });
  
      const createdCourse = await course.save();
      res.status(201).json(createdCourse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const editCourse = async (req, res) => {
    const { id } = req.params;
    const { courseId, name, subject, description, duration, credits, startdate, examdate } = req.body;
  
    try {
      const course = await Course.findById(id);
  
      if (course) {
        course.courseId = courseId || course.courseId;
        course.name = name || course.name;
        course.subject = subject || course.subject;
        course.description = description || course.description;
        course.duration = duration || course.duration;
        course.credits = credits || course.credits;
        course.startdate = startdate || course.startdate;
        course.examdate = examdate || course.examdate;
  
        const updatedCourse = await course.save();
        res.status(200).json(updatedCourse);
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseStudents = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId).populate('students');
    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.status(200).json(course.students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
