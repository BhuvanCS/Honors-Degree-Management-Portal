import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
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
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const studentdata = [
  {
    firstName: "James",
    lastName: "Smith",
    emailAddress: "james.smith@example.com",
    password: "password123",
    usn: "1BI21CS36",
    cgpa: 8.5
  },
  {
    firstName: "Abhi",
    lastName: "Kumar",
    emailAddress: "abhi.kumar@example.com",
    password: "password456",
    usn: "1BI21CS43",
    cgpa: 9.2
  },
  {
    firstName: "Raj",
    lastName: "Sharma",
    emailAddress: "raj.sharma@example.com",
    password: "password789",
    usn: "1BI21IS23",
    cgpa: 8.8
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    emailAddress: "emily.davis@example.com",
    password: "password321",
    usn: "1BI21EC25",
    cgpa: 9.0
  },
  {
    firstName: "Sophia",
    lastName: "Lee",
    emailAddress: "sophia.lee@example.com",
    password: "password654",
    usn: "1BI21ME28",
    cgpa: 8.7
  }
];

function Row(props) {
  const { student } = props;

  const handleAccept = () => {
    console.log(`Accepted application of ${student.firstName} ${student.lastName}`);
    // Add your logic for accepting the application here
  };

  const handleReject = () => {
    console.log(`Rejected application of ${student.firstName} ${student.lastName}`);
    // Add your logic for rejecting the application here
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">{student.firstName}</TableCell>
        <TableCell align="left">{student.lastName}</TableCell>
        <TableCell align="left">{student.emailAddress}</TableCell>
        <TableCell align="left">{student.usn}</TableCell>
        <TableCell align="left">{student.cgpa}</TableCell>
        <TableCell>
          <Button variant="outlined" color="success" onClick={handleAccept}>
            Accept
          </Button>
          <Button variant="outlined" color="error" onClick={handleReject} style={{ marginLeft: '8px' }}>
            Reject
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  student: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    usn: PropTypes.string.isRequired,
    cgpa: PropTypes.number.isRequired,
  }).isRequired,
};

export default function RegisteredStudentList() {
  return (
    <Paper  elevation={4}
    sx={{
      p: 2,
      m:2

    }}>
      <Typography gutterBottom variant="h5" component="div" sx={{ mb: 3 }}>
            Registered Students
          </Typography>
          
        <Divider  sx={{mb:1}} />
         <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Email Address</TableCell>
            <TableCell align="left">USN</TableCell>
            <TableCell align="left">CGPA</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentdata.map((student) => (
            <Row key={student.usn} student={student} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Paper>
   
  );
}
