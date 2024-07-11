import * as React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { acceptStudent, getAllStudents, rejectStudent } from "../../api";

function Row({ key, student }) {
  const handleAccept = async () => {
    console.log(`Accepted application of ${student.name}`);
    try {
      const data = {
        usn: student.usn,
        isAccepted: true,
      };
      const res = await acceptStudent(data, localStorage.getItem("token"));
      alert(`Student ${student.usn} accepted successfully!`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
    // Add your logic for accepting the application here
  };

  const handleReject = async () => {
    console.log(`Rejected application of ${student.usn}`);
    try {
      const data = {
        usn: student.usn,
      };
      console.log(data)
      console.log(localStorage.getItem("token"))
      const res = await rejectStudent(data, localStorage.getItem("token"));
      alert(`Student ${student.usn} deleted successfully!`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {student.name}
        </TableCell>
        <TableCell align="left">{student.email}</TableCell>
        <TableCell align="left">{student.usn}</TableCell>
        <TableCell align="left">{student.cgpa}</TableCell>
        <TableCell>
          <Button variant="outlined" color="success" onClick={handleAccept}>
            Accept
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleReject}
            style={{ marginLeft: "8px" }}
          >
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
  const [students, setStudents] = React.useState([]);

  React.useEffect(() => {
    const fetchAppliedStudents = async () => {
      try {
        const res = await getAllStudents(localStorage.getItem("token"));
        const allStudents = res.data;
        const appliedStudents = allStudents.filter(
          (student) => !student.isAccepted
        );
        setStudents(appliedStudents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppliedStudents();
  }, []);
  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        m: 2,
      }}
    >
      <Typography gutterBottom variant="h5" component="div" sx={{ mb: 3 }}>
        Applied Students
      </Typography>

      <Divider sx={{ mb: 1 }} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Email Address</TableCell>
              <TableCell align="left">USN</TableCell>
              <TableCell align="left">CGPA</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <Row key={student.usn} student={student} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
