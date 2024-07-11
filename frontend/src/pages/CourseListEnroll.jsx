import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { getCourseList } from '../api';
import CourseCardEnroll from '../components/courses/CourseCardEnroll';
import AuthContext from '../context/AuthContext';

export default function CourseListEnroll() {
  const [courses, setCourses] = React.useState([]);
  const [error, setError] = React.useState(null);
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await getCourseList();
        const allCourses = res.data;
        const userCourses = user.courses.map(course => course.course);
        
        const enrolledCourses = userCourses.map(course => course._id);
        const availableCourses = allCourses.filter(course => !enrolledCourses.includes(course._id));
        
        setCourses(availableCourses);
        
      } catch (error) {
        setError('An error occurred while fetching the courses.');
      }
    };

    fetchCourses();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box>
      <Paper
        elevation={4}
        sx={{
          p: 2,
          pt: { xs: 14, sm: 15 }, pb: { xs: 8, sm: 8 }
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Course List
        </Typography>
        <Box sx={{ height: '500px', overflowY: 'auto', p: 2 }}>
          <Grid container spacing={2} columns={12}>
            {courses.map((course) => (
              <Grid item key={course._id} xs={12} sm={4} md={4} lg={2}>
                <CourseCardEnroll course={course} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
