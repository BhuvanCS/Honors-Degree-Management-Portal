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
import { getAllStudentCourse,  verifyCompletion } from "../../api";

function Row({ studentCourse }) {
    const handleViewCertificate = () => {
        let link = studentCourse.certificateLink;
        if (!/^https?:\/\//i.test(link)) {
          link = "http://" + link;
        }
        window.open(link, "_blank");
      };

  const handleMarkAsComplete = async () => {
    console.log(`Marking course as complete for ${studentCourse.student.usn}`);
    try {
      const data = {
        usn: studentCourse.student.usn,
        courseId: studentCourse.course.courseId,
        isCompleted: true,
      };
      const res = await verifyCompletion(data, localStorage.getItem("token"));
      alert(`Course ${studentCourse.course.name} marked as complete for ${studentCourse.student.usn}!`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {studentCourse.student.usn}
        </TableCell>
        <TableCell align="left">{studentCourse.student.name}</TableCell>
        <TableCell align="left">{studentCourse.course.name}</TableCell>
        <TableCell align="left">{studentCourse.course.credits}</TableCell>
        <TableCell>
          <Button variant="outlined" onClick={handleViewCertificate}>
            View Certificate
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={handleMarkAsComplete}
            style={{ marginLeft: "8px" }}
          >
            Mark as Complete
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  studentCourse: PropTypes.shape({
    usn: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    courseName: PropTypes.string.isRequired,
    credits: PropTypes.number.isRequired,
    certificateLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CertificateVerificationList() {
  const [studentCourses, setStudentCourses] = React.useState([]);

  React.useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const res = await getAllStudentCourse(localStorage.getItem("token"));
        const allStudentCourses = res.data;
        const filteredStudentCourses = allStudentCourses.filter(
          (sc) => sc.certificateLink !== "" && !sc.isCompleted
        );
        setStudentCourses(filteredStudentCourses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentCourses();
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
        Certificate Verification
      </Typography>

      <Divider sx={{ mb: 1 }} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>USN</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Course Name</TableCell>
              <TableCell align="left">Credits</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentCourses.map((studentCourse) => (
              <Row key={studentCourse.student.usn + studentCourse.course.name} studentCourse={studentCourse} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
