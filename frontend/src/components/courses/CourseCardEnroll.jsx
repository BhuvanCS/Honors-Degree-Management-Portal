import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import AuthContext from '../../context/AuthContext';
import { enrollToCourse } from '../../api';

export default function CourseCardEnroll({ course }) {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);

  const handleCardClick = () => {
    navigate(`/courseinfo`, { state: { 'course_name': course.name } });
  };

  const handleButtonClick = async () => {
    console.log('Add to Registered Course clicked');
    try {
      const data = { courseId: course.courseId, usn: user.usn };
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found');
      }

      console.log('Token:', token);
      console.log('Data:', data);

      // Call the enrollToCourse API
      const response = await enrollToCourse(data, token);
      console.log('Response:', response);
      console.log("Successfully Registered for course " + course.courseId);

      // Navigate to the student page after successful enrollment
      navigate('/student');
    } catch (error) {
      console.error('Error enrolling to course:', error.message);
      // Handle error as needed, e.g., show an error message
    }
  };

  return (
    <Card sx={{ maxWidth: '100%', height: '100%' }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          sx={{ height: 110, maxWidth: '100%', objectFit: 'cover' }}
          image="/course_image.jpg"
          alt="course image"
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            {course.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.subject}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Tooltip title="Add to Registered Course">
            <IconButton aria-label="add course" size="small" onClick={handleButtonClick}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardActions>
    </Card>
  );
}
