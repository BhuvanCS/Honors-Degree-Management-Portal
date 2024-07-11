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
import Button from '@mui/material/Button';

const columns = [
    { field: "course_name", headerName: 'Course', minWidth: 200, width: 440, flex: 1 },
    { field: "duration_weeks", headerName: 'Duration', minWidth: 40, width: 40, flex: 1 },
    { field: "credits", headerName: 'Credits', minWidth: 40, width: 40, flex: 1},
    { field: "start_date", headerName: "Start Date", minWidth: 150, width: 130, flex: 1},
    { field: "exam_date", headerName: "Exam Date", minWidth: 150, width: 130, flex: 1},
    { field: "view_certificate", headerName: "View Certificate", minWidth: 150, width: 150, flex: 1 },
    { field: "complete_course", headerName: "Complete Course", minWidth: 150, width: 150, flex: 1 },
];

export default function CourseTab({ courses }) {
  const navigate = useNavigate();
  const [completionStatus, setCompletionStatus] = React.useState(
    courses.reduce((acc, course) => {
      acc[course.course_name] = null; // null means neither accepted nor rejected
      return acc;
    }, {})
  );

  const handleRowClick = (course) => { 
    navigate("/courseinfo", { state: course }); 
  };

  const handleViewCertificate = (course) => {
    console.log("Viewing certificate for", course.course_name);
  };

  const handleCompleteCourse = (course) => {
    setCompletionStatus((prevStatus) => ({
      ...prevStatus,
      [course.course_name]: prevStatus[course.course_name] === 'accepted' ? 'rejected' : 'accepted'
    }));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" gutterBottom component="div">
        Course List
      </Typography>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
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
                <TableCell align="left">{course.course_name}</TableCell>
                <TableCell align="left">{course.duration_weeks}</TableCell>
                <TableCell align="left">{course.credits}</TableCell>
                <TableCell align="left">{course.start_date}</TableCell>
                <TableCell align="left">{course.exam_date}</TableCell>
                <TableCell align="left">
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewCertificate(course);
                    }}
                  >
                    View Certificate
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button 
                    variant="contained" 
                    size="small"
                    color={completionStatus[course.course_name] === 'accepted' ? 'success' : 'error'} 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompleteCourse(course);
                    }}
                  >
                    {completionStatus[course.course_name] === 'accepted' ? 'Accepted' : 'Rejected'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
