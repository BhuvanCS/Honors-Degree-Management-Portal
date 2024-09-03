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
import CourseTab from './CourseTab';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../api';
import { Alert, Container } from '@mui/material';


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
  
  const handleRowClick = (student) => { navigate(`/profile/${student.usn}`,{ state: student })};  
  
  const { student } = props;
  const [open, setOpen] = React.useState(false);
  //console.log(student.enrolled_courses.course_name)
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
        <TableCell align="left">{student.usn}</TableCell>
        <TableCell align="left">{student.email}</TableCell>
        <TableCell align="left">{student.cgpa}</TableCell> 
        <TableCell ><Button variant="outlined" onClick={() =>{handleRowClick(student)}} >
        View Profile</Button></TableCell>
      </TableRow>
      <TableRow type={'button'}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
          
            <CourseTab  courses={student.courses}/>
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
    const [studentList, setStudentList] = React.useState([]);
    const [error, setError] = React.useState("");
  
    React.useEffect(() => {
      const fetchAllStudents = async () => {
        try {
          const res = await getAllStudents(localStorage.getItem("token"));
          console.log(res);
          setStudentList(res.data);
        } catch (error) {
          console.error("Error getting list: " + error.message);
          if (error.response && error.response.status === 403) {
            setError("All students list is restricted to Admin only! Please login as admin.");
          } else {
            setError("An error occurred while fetching the profile.");
          }
        }
      };
  
      fetchAllStudents();
    }, []);

    if (error) {
      return (
        <Container maxWidth="md">
          <Alert severity="error">{error}</Alert>
        </Container>
      );
    }
  
    return (
      <TableContainer component={Paper} sx={{ pt: { xs: 14, sm: 15 }, pb: { xs: 8, sm: 8 } }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Student Name</TableCell>
              <TableCell align="left">USN</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">CGPA</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.length > 0 ? (
              studentList.map((student) => (
                <Row key={student._id} student={student} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {error || "No students found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }