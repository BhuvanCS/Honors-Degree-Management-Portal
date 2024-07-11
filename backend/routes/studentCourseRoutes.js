import express from 'express';
import { addCourseToStudent, getAllStudentCourse, getStudentProgressForCourse, uploadCertificate, verifyCourseCompletion } from '../controllers/studentCourseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/add', protect, addCourseToStudent);
router.patch('/uploadCertificate', protect, uploadCertificate);
router.patch('/verifyCourse', protect, admin, verifyCourseCompletion);
router.get('/progress/:courseId', protect, admin, getStudentProgressForCourse);
router.get('/all', protect, admin, getAllStudentCourse);

export default router;
