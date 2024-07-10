import * as React from 'react';
import Stack from '@mui/material/Stack';
import CourseSection from './CourseSection';

export default function EnrolledCourses() {
  return (
      <Stack 
      direction="column"
      sx={{ paddingTop: 2, width:"100%"}}
      spacing={2}
      >
        <CourseSection iscompleted={false} title={'Ongoing Course'} />
        <CourseSection iscompleted={true} title={'Completed Course'}  />
      </Stack>
      
   
  );
}
