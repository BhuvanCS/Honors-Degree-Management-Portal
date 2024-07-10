import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import axios from "axios";
import { getCourseDetails, getCourseStudents, verifyCompletion } from "../api";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const courseId = useParams();

  useEffect(() => {
    // Fetch course details
    const fetchCourseDetails = async () => {
      try {
        const res1 = await getCourseDetails(
          courseId.courseId,
          localStorage.getItem("token")
        );
        const res2 = await getCourseStudents(
          courseId.courseId,
          localStorage.getItem("token")
        );
        
        setCourseDetails(res1.data);
        setStudentList(res2.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchCourseDetails();
  }, []);

  const handleToggleCompletion = async (student) => {
    const updatedStatus = !student.isCompleted;
    // Update the completion status in the backend
    const data = {
      courseId: courseId.courseId,
      usn: student.usn,
      isCompleted: updatedStatus,
    };
    const res = await verifyCompletion(data, localStorage.getItem("token"));
    //reflect it in frontend
    if (res) {
      setStudentList((prevList) =>
        prevList.map((stu) =>
          stu.usn === student.usn ? { ...stu, isCompleted: updatedStatus } : stu
        )
      );
    }
  };

  if (!courseDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{ pt: { xs: 14, sm: 15 }, pb: { xs: 8, sm: 8 } }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h4">{courseDetails.name}</Typography>
        <Typography variant="subtitle1">
          Course ID: {courseDetails.courseId}
        </Typography>
        <Typography variant="subtitle1">
          Subject: {courseDetails.subject}
        </Typography>
        <Typography variant="subtitle1">
          Professor: {courseDetails.professor}
        </Typography>
        <Typography variant="subtitle1">
          Institute: {courseDetails.institute}
        </Typography>
        <Typography variant="subtitle1">
          Duration: {courseDetails.duration} weeks
        </Typography>
        <Typography variant="subtitle1">
          Credits: {courseDetails.credits}
        </Typography>
        <Typography variant="subtitle1">
          Start Date: {new Date(courseDetails.startdate).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle1">
          End Date: {new Date(courseDetails.enddate).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle1">
          Exam Date: {new Date(courseDetails.examdate).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">{courseDetails.description}</Typography>
      </Paper>

      <Typography variant="h5">Enrolled Students</Typography>
      <List>
        {studentList.map((student) => (
          <Box key={student._id}>
            <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
              <ListItemText
                primary={student.studentName}
                secondary={student.courseName}
              />
              <Box sx={{ display: "flex", gap: 1 }}>
                {student.certificateLink && (
                  <Button
                    variant="outlined"
                    component="a"
                    href={student.certificateLink}
                    target="_blank"
                  >
                    View Certificate
                  </Button>
                )}
                <Button
                  variant="contained"
                  color={student.isCompleted ? "secondary" : "primary"}
                  onClick={() => handleToggleCompletion(student)}
                >
                  {student.isCompleted
                    ? "Mark as Unfinished"
                    : "Mark as Complete"}
                </Button>
              </Box>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Container>
  );
};

export default CourseDetail;
