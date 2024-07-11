import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
    { field: "course_name", headerName: 'Course',minWidth: 200, width: 440,flex: 1 },
    { field: "institute", headerName: 'Institute',minWidth: 200, width: 130,flex: 1},
    { field: "duration_weeks", headerName: 'Duration',minWidth: 40, width: 40,flex: 1 },
    { field: "credits", headerName: 'Credits', minWidth: 40,width: 40,flex: 1},
    { field: "start_date", headerName: "Start Date",minWidth: 150, width: 130,flex: 1},
    { field: "exam_date", headerName: "Exam Date",minWidth: 150, width: 130,flex: 1},
 
];

export default function CourseTab({courses}) {
  const navigate = useNavigate();
  
  const handleRowClick = (course) => { navigate("/courseinfo",{ state: course })}; // add route in index.js   <Route path="/courseinfo" element={<CourseInfo />} />


  return (
    <Box sx={{ width:"100%" }}>
              <Typography variant="h6" gutterBottom component="div">
                Course List
              </Typography>
              <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={'left'}
                
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {courses.map((course) => (
                    <TableRow key={course.course_name} hover role="button" tabIndex={-1} onClick={() => handleRowClick(course)}>
                      <TableCell align="left">{course.name}</TableCell>
           <TableCell align="left">{course.institute}</TableCell>
        <TableCell align="left">{course.duration}</TableCell>
        <TableCell align="left">{course.credits}</TableCell>
        <TableCell align="left">{course.startdate}</TableCell>
        <TableCell align="left">{course.examdate}</TableCell>
        
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
     

            
           
            </Box>
  );
}
