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

export default function StudentCourseCard({ courseId }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/courseinfo`,{ state: {'course_name':"course_name"} });
  };

  const handleButtonClick = () => {
    console.log('Add to Registered Course clicked');
    // Implement your logic here, for example, adding the course to the registered courses list
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
            Course Name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Info
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
