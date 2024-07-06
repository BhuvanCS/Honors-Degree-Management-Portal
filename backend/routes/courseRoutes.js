import express from 'express';
import { addCourse, getAllCourses, getCourseStudents } from '../controllers/courseController.js';

const router = express.Router();

router.post('/', addCourse);
router.get('/', getAllCourses);
router.get('/:courseId', getCourseStudents);

export default router;
