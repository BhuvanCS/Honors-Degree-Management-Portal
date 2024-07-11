import React, { useState, useEffect, useContext } from "react";
import Stack from "@mui/material/Stack";
import CourseSection from "../components/courses/CourseSection";
import AuthContext from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getProfile } from "../api";
import { Alert, Container } from "@mui/material";

export default function StudentLandingPage() {
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user || !user.courses) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        console.log(user.usn, token);
        // const res = await getProfile(user.usn, token);
        // setUser(res.data)
        const courses = user.courses;

        console.log(courses);

        if (courses.length > 0 && !courses[0].course) {
          // If courses are not populated, reload the page
          window.location.reload();
        }
        const ongoing = courses.filter((course) => !course.isCompleted);
        const completed = courses.filter((course) => course.isCompleted);

        setOngoingCourses(ongoing);
        setCompletedCourses(completed);
      } catch (error) {
        console.error(error);
        setError(
          "An error occurred while fetching the courses." + error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container
        maxWidth="md"
        sx={{ pt: { xs: 14, sm: 15 }, pb: { xs: 8, sm: 8 } }}
      >
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Stack
      direction="column"
      sx={{
        paddingTop: 2,
        width: "100%",
        pt: { xs: 14, sm: 15 },
        pb: { xs: 8, sm: 8 },
      }}
      spacing={2}
    >
      <CourseSection
        isCompleted={false}
        title={"Ongoing Courses"}
        courses={ongoingCourses}
      />
      <CourseSection
        isCompleted={true}
        title={"Completed Courses"}
        courses={completedCourses}
      />
    </Stack>
  );
}
