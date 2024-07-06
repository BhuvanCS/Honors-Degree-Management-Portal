import express from 'express';
import { addCourseToStudent, updateCompletionPercentage, getStudentProgressForCourse } from '../controllers/studentCourseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/add', protect, addCourseToStudent);
router.patch('/updateCompletion', protect, updateCompletionPercentage);
router.get('/progress/:courseId', protect, admin, getStudentProgressForCourse);

export default router;
