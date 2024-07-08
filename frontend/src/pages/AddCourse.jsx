import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import axios from "axios";
import { addCourse } from "../api";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const AddCourse = () => {
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [credits, setCredits] = useState(0);
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [examdate, setExamdate] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCourse = {
        courseId,
        name: courseName,
        subject,
        description,
        duration,
        credits,
        startdate,
        enddate,
        examdate,
      };
      console.log(newCourse);
      await addCourse(newCourse, localStorage.getItem("token"));
      alert("Course added successfully!")
      navigate('/coursedashboard')
    } catch (error) {
        alert("Error adding course!")
      console.error("Error adding course:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add New Course
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="courseId"
                  label="Course ID"
                  name="courseId"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="subject"
                  label="Subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="courseName"
                  label="Course Name"
                  name="courseName"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="duration"
                  label="Duration (Weeks)"
                  name="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="credits"
                  label="Credits"
                  name="credits"
                  type="number"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="startdate"
                  label="Start Date"
                  name="startdate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={startdate}
                  onChange={(e) => setStartdate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="enddate"
                  label="End Date"
                  name="enddate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={enddate}
                  onChange={(e) => setEnddate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="examdate"
                  label="Exam Date"
                  name="examdate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={examdate}
                  onChange={(e) => setExamdate(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Course
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddCourse;
