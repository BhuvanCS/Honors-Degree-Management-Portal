import express from 'express';
import { addCourse, editCourse, getAllCourses, getCourseStudents } from '../controllers/courseController.js';
import { protect} from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/add', protect, admin, addCourse);
router.put('/edit/:courseId', protect, admin, editCourse);
router.get('/', getAllCourses);
router.get('/:courseId', protect, admin, getCourseStudents);

export default router;
