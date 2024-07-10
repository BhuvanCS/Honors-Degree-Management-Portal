import Course from '../models/Course.js';
import User from '../models/User.js';

export const addCourse = async (req, res) => {
    const { courseId, name, subject, professor, institute, description, duration, credits, startdate, enddate, examdate } = req.body;
  
    try {
      const course = new Course({
        courseId,
        name,
        subject,
        professor,
        institute,
        description,
        duration,
        credits,
        startdate,
        enddate,
        examdate,
      });
  
      const createdCourse = await course.save();
      res.status(201).json(createdCourse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const editCourse = async (req, res) => {
    const { courseId } = req.params;
    const { cId, name, subject, professor, institute, description, duration, credits, startdate, enddate, examdate } = req.body;
  
    try {
      const course = await Course.findOne({ courseId });
  
      if (course) {
        course.courseId = cId || course.courseId;
        course.name = name || course.name;
        course.subject = subject || course.subject;
        course.professor = professor || course.professor;
        course.institute = institute || course.institute;
        course.description = description || course.description;
        course.duration = duration || course.duration;
        course.credits = credits || course.credits;
        course.startdate = startdate || course.startdate;
        course.enddate = enddate || course.enddate;
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
    const course = await Course.findOne({courseId}).select('-students ');
    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
