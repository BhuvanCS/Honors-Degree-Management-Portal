import express from 'express';
import { deleteStudent, getAllStudents, getStudentProfile, updateStudentStatus } from '../controllers/studentController.js';
import { authorizeProfileAccess, protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getAllStudents);
router.get('/:usn', protect, authorizeProfileAccess, getStudentProfile);
router.patch('/status', protect, admin, updateStudentStatus);
router.delete('/delete', protect, admin, deleteStudent);

export default router;
