import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import CourseCard from './CourseCard';
import { useNavigate } from 'react-router-dom';


export default function CourseSection({isCompleted, title, courses}) {
  
  const [expanded, setExpanded] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(4); // Initial visible count
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleEnrollCourse = () => {
    navigate('/courselist/enroll')
  };

  React.useEffect(() => {
    if (expanded) {
      setVisibleCount(courses.length); // Show all cards if expanded
    } else {
      setVisibleCount(4); // Show initial visibleCount cards when collapsed
    }
  }, [expanded]);

  return (
        <Paper sx={{ padding: 2 }} elevation={3}>
        <Stack
          direction="row"
          sx={{ paddingBottom: 2 }}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography gutterBottom variant="h5" component="div" sx={{ mb: 3 }}>
            {title}
          </Typography>
          <div>
            {isCompleted?<></>:<Button onClick = {handleEnrollCourse}   variant="text" startIcon={<AddIcon />}>
              Enroll a New course
            </Button>}
           
            <Button
              variant="text"
              onClick={handleExpandClick}
              size="small"
              color={expanded ? 'secondary' : 'primary'}
            >
              {expanded ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        </Stack>

        <Divider />

        <Grid container spacing={2} columns={12} sx={{height:'40%', pt:2}}>
          {courses.map((course, index) => (
            <Grid item key={course.courseId} xs={12} sm={6} md={4} lg={3}>
              <Collapse in={index < visibleCount} timeout="auto" unmountOnExit>
                  <CourseCard course={course}/> 
              </Collapse>
            </Grid>
          ))}
        </Grid>
      </Paper> 
  );
}
