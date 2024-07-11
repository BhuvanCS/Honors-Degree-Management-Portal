import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import coursedata  from './coursedata';
// import imageUrl from './icon.jpg'
import Collapse from "@mui/material/Collapse";
import { getCourseList } from "../api";
import AuthContext from "../context/AuthContext";
// import ReactVirtualizedTable from './EnrolledStudents'

// const coursedata=[1,2,3,4,5,5]

export default function CourseList() {
  
  const [courselist, setCourselist] = React.useState([]);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourseList();
        setCourselist(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const cards = courselist.map((course, index) => (
    <CourseCard key={index} course={course} />
  ));

  return (
    <>
      <Box sx={{ p: 2, pt: { xs: 14, sm: 15 }, pb: { xs: 8, sm: 8 } }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ mb: 3 }}>
          Course List
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography gutterBottom variant="body1" component="div">
              Course
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={6}></Grid>
              <Grid item xs={2}>
                <Typography gutterBottom variant="body1" component="div">
                  Duration
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography gutterBottom variant="body1" component="div">
                  Timings
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography gutterBottom variant="body1" component="div">
                  Exam Date
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {cards}
      </Box>
    </>
  );
}

function CourseCard({ course }) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <Card sx={{ mb: 1 }}>
      <CardActionArea onClick={handleChange}>
        <Grid container>
          <Grid item xs={2} sx={{ p: 2 }}>
          <CardMedia
          component="img"
          sx={{ height: 110, maxWidth: "100%", objectFit: "cover" }}
          src="/course_image.jpg"
          alt="course image"
        />
          </Grid>
          <Grid item xs={10}>
            <CardContent>
              <Grid container>
                <Grid item xs={6}>
                  <Typography gutterBottom level="h4" component="div">
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.professor || "--"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.institute || "--"}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" color="text.secondary">
                    {course.duration} Weeks
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" color="text.secondary">
                    {course.startdate}
                    <br />
                    To
                    <br />
                    {course.enddate || "--"}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" color="text.secondary">
                    {course.examdate}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
      {/* <Collapse in={checked}>
        <ReactVirtualizedTable />
      </Collapse> */}
    </Card>
  );
}
