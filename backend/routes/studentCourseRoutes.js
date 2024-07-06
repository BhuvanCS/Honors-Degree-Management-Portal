import express from 'express';
import { addCourseToStudent, updateCompletionPercentage, getStudentProgressForCourse } from '../controllers/studentCourseController.js';

const router = express.Router();

router.post('/add', addCourseToStudent);
router.patch('/updateCompletion', updateCompletionPercentage);
router.get('/progress/:courseId', getStudentProgressForCourse);

export default router;
