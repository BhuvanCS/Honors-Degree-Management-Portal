import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import studentCourseRoutes from './routes/studentCourseRoutes.js'
import connectDB from './config/dbconfig.js';

dotenv.config();

const app = express();
app.use(express.json());

// Database connection
connectDB()

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/studentCourses', studentCourseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
