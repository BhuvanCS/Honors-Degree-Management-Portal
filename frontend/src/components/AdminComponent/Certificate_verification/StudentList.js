import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CourseTab from './coursetab';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


const studentdata = [
  {
      "name": "James",
      "id": "1BI21CS36",
      "semester": 6,
      "department": "CSE",
      "section": "A",
      "enrolled_courses": [
          {
              "course_name": "Computer Architecture",
              "professor": "Prof. Smruti R. Sarangi",
              "institute": "IITD",
              "duration_weeks": 12,
              "credits": 3,
              "start_date": "January 24, 2022",
              "end_date": "April 15, 2022",
              "exam_date": "April 24, 2022"
          },
          {
              "course_name": "User-centric Computing for Human-Computer Interaction",
              "professor": "Prof. Samit Bhattacharya",
              "institute": "IITG",
              "duration_weeks": 8,
              "credits": 2,
              "start_date": "January 24, 2022",
              "end_date": "March 18, 2022",
              "exam_date": "March 27, 2022"
          },
          {
              "course_name": "Advanced Graph Theory",
              "professor": "Prof. Rajiv Misra",
              "institute": "IIT Patna",
              "duration_weeks": 8,
              "credits": 2,
              "start_date": "February 21, 2022",
              "end_date": "April 15, 2022",
              "exam_date": "April 23, 2022"
          },
          {
              "course_name": "Cloud Computing and Distributed Systems",
              "professor": "Prof. Rajiv Misra",
              "institute": "IIT Patna",
              "duration_weeks": 8,
              "credits": 2,
              "start_date": "January 24, 2022",
              "end_date": "March 18, 2022",
              "exam_date": "March 27, 2022"
          },
          {
              "course_name": "Computer Networks and Internet Protocol",
              "professors": ["Prof. Soumya Kanti Ghosh", "Prof. Sandip Chakraborty"],
              "institute": "IITKGP",
              "duration_weeks": 12,
              "credits": 3,
              "start_date": "January 24, 2022",
              "end_date": "April 15, 2022",
              "exam_date": "April 23, 2022"
          },
          {
              "course_name": "Cloud computing",
              "professor": "Prof. Soumya Kanti Ghosh",
              "institute": "IITKGP",
              "duration_weeks": 8,
              "extension_weeks": 4,
              "start_date": "January 24, 2022",
              "end_date": "April 15, 2022",
              "exam_date": "April 24, 2022"
          },
          {
              "course_name": "Introduction to parallel programming with OpenMP and MPI",
              "professor": "Prof. Yogish Sabharwal",
              "institute": "IITD",
              "duration_weeks": 4,
              "extension_weeks": 4,
              "start_date": "January 24, 2022",
              "end_date": "March 18, 2022",
              "exam_date": "March 27, 2022"
          }
      ]
  },
  {
      "name": "Abhi",
      "id": "1BI21CS43",
      "semester": 9,
      "department": "CSE",
      "section": "A",
      "enrolled_courses": [
          {
              "course_name": "Computer Architecture",
              "professor": "Prof. Smruti R. Sarangi",
              "institute": "IITD",
              "duration_weeks": 12,
              "credits": 3,
              "start_date": "January 24, 2022",
              "end_date": "April 15, 2022",
              "exam_date": "April 24, 2022"
          },
          {
              "course_name": "User-centric Computing for Human-Computer Interaction",
              "professor": "Prof. Samit Bhattacharya",
              "institute": "IITG",
              "duration_weeks": 8,
              "credits": 2,
              "start_date": "January 24, 2022",
              "end_date": "March 18, 2022",
              "exam_date": "March 27, 2022"
          },
          {
              "course_name": "Advanced Graph Theory",
              "professor": "Prof. Rajiv Misra",
              "institute": "IIT Patna",
              "duration_weeks": 8,
              "credits": 2,
              "start_date": "February 21, 2022",
              "end_date": "April 15, 2022",
              "exam_date": "April 23, 2022"
          },
          {
              "course_name": "Cloud Computing and Distributed Systems",
              "professor": "Prof. Rajiv Misra",
              "institute": "IIT Patna",
              "duration_weeks": 8,
              "credits": 2,
              "start_date": "January 24, 2022",
              "end_date": "March 18, 2022",
              "exam_date": "March 27, 2022"
          },
          {
              "course_name": "Computer Networks and Internet Protocol",
              "professors": ["Prof. Soumya Kanti Ghosh", "Prof. Sandip Chakraborty"],
              "institute": "IITKGP",
              "duration_weeks": 12,
              "credits": 3,
              "start_date": "January 24, 2022",
              "end_date": "April 15, 2022",
              "exam_date": "April 23, 2022"
          },
          {
              "course_name": "Cloud computing",
              "professor": "Prof. Soumya Kanti Ghosh",
              "institute": "IITKGP",
              "duration_weeks": 8,
              "extension_weeks": 4,
              "start_date": "January 24, 2022",
              "end_date": "April 15, 2022",
              "exam_date": "April 24, 2022"
          },
          {
              "course_name": "Introduction to parallel programming with OpenMP and MPI",
              "professor": "Prof. Yogish Sabharwal",
              "institute": "IITD",
              "duration_weeks": 4,
              "extension_weeks": 4,
              "start_date": "January 24, 2022",
              "end_date": "March 18, 2022",
              "exam_date": "March 27, 2022"
          }
      ]
  },
  {
      "name": "Raj",
      "id": "1BI21CS23",
      "semester": 6,
      "department": "IS",
      "section": "C",
      "enrolled_courses": [
          {
              "course_name": "Computer Architecture",
              "professor": "Prof. Smruti R. Sarangi",
              "institute": "IITD",
              "duration_weeks": 12,
              "credits": 3,
              "start_date": "January 24, 2022",
              "end_date": "April 15, 2022",
              "exam_date": "April 24, 2022"
          },
          {
              "course_name": "User-centric Computing for Human-Computer Interaction",
              "professor": "Prof. Samit Bhattacharya",
              "institute": "IITG",
              "duration_weeks": 8,
              "credits": 2,
              "start_date": "January 24, 2022",
              "end_date": "March 18, 2022",
              "exam_date": "March 27, 2022"
          },
          {
              "course_name": "Advanced Graph Theory",
              "professor": "Prof. Rajiv Misra",
              "institute": "IIT Patna",
              "duration_weeks": 8,
              "credits": 2,
              "start_date": "February 21, 2022",
              "end_date": "April 15, 2022",
              "exam_date": "April 23, 2022"
          },
          {
              "course_name": "Cloud Computing and Distributed Systems",
              "professor": "Prof. Rajiv Misra",
              "institute": "IIT Patna",
              "duration_weeks": 8,
              "credits": 2,
              "start_date": "January 24, 2022",
              "end_date": "March 18, 2022",
              "exam_date": "March 27, 2022"
          },
          {
              "course_name": "Computer Networks and Internet Protocol",
              "professors": ["Prof. Soumya Kanti Ghosh", "Prof. Sandip Chakraborty"],
              "institute": "IITKGP",
              "duration_weeks": 12,
              "credits": 3,
              "start_date": "January 24, 2022",
              "end_date": "April 15, 2022",
              "exam_date": "April 23, 2022"
          },
          {
              "course_name": "Cloud computing",
              "professor": "Prof. Soumya Kanti Ghosh",
              "institute": "IITKGP",
              "duration_weeks": 8,
              "extension_weeks": 4,
              "start_date": "January 24, 2022",
              "end_date": "April 15, 2022",
              "exam_date": "April 24, 2022"
          },
          {
              "course_name": "Introduction to parallel programming with OpenMP and MPI",
              "professor": "Prof. Yogish Sabharwal",
              "institute": "IITD",
              "duration_weeks": 4,
              "extension_weeks": 4,
              "start_date": "January 24, 2022",
              "end_date": "March 18, 2022",
              "exam_date": "March 27, 2022"
          }
      ]
  }
];

function Row(props) {
  const navigate = useNavigate();
  
  const handleRowClick = (student) => { navigate("/studentinfo",{ state: student })};  // add route in index.js   <Route path="/studentinfo" element={<StudentInfo />} />
  
  const { student } = props;
  const [open, setOpen] = React.useState(false);
  console.log(student.enrolled_courses.course_name)
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{student.name}</TableCell>
        <TableCell align="left">{student.id}</TableCell>
        <TableCell align="left">{student.semester}</TableCell>
        <TableCell align="left">{student.department}</TableCell>
        <TableCell align="left">{student.section}</TableCell>
        <TableCell ><Button variant="outlined" onClick={() =>{handleRowClick(student)}} startIcon={<EditIcon /> }>
        Edit</Button></TableCell>
      </TableRow>
      <TableRow type={'button'}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
          
            <CourseTab  courses={student.enrolled_courses}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  student: PropTypes.shape({
    name: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        semester: PropTypes.number.isRequired,
        department: PropTypes.string.isRequired,
        section: PropTypes.string.isRequired,
    
    enrolled_courses: PropTypes.arrayOf(
      PropTypes.shape({
        course_name: PropTypes.string.isRequired,
        professor: PropTypes.string.isRequired,
        institute: PropTypes.number.isRequired,
        duration_weeks: PropTypes.string.isRequired,
        extension_weeks: PropTypes.number.isRequired,
        start_date: PropTypes.string.isRequired,
        end_date: PropTypes.string.isRequired,
        exam_date: PropTypes.string.isRequired,
        
      }),
    ).isRequired,
   
  }).isRequired,
};

export default function StudentList() {
  return (
    <Paper  elevation={4}
    sx={{
      p: 2,
      m:2
      
    }}>
      <Typography gutterBottom variant="h5" component="div" sx={{ mb: 3 }}>
           Certificate Verification
          </Typography>
          
        <Divider sx={{mb:1}}/>
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Student Name</TableCell>
            <TableCell align="left">USN</TableCell>
            <TableCell align="left">Semester</TableCell>
            <TableCell align="left">Department</TableCell>
            <TableCell align="left">Section</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentdata.map((student) => (
            <Row key={student.id} student={student} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    
  );
}
