import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import StudentCourseCard from './StudentCourseCard';

export default function CourseList() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  return (
    <Box>
      <Paper
        elevation={4}
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Course List
        </Typography>
        <Box sx={{ height: '500px', overflowY: 'auto', p: 2 }}>
          <Grid container spacing={2} columns={12}>
            {cards.map((number) => (
              <Grid item key={number.toString()} xs={12} sm={4} md={4} lg={2}>
                <StudentCourseCard />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
