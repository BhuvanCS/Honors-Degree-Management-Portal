import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  LinearProgress,
  Divider,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { getProfile } from "../api";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const { usn } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileUsn = usn;
        const res = await getProfile(profileUsn, localStorage.getItem("token"));
        console.log(res);
        setProfile(res.data);
      } catch (error) {
        console.error("Error getting profile: " + error.message);
        if (error.response && error.response.status === 403) {
          setError("You don't have access to view this user's profile.");
        } else {
          setError("An error occurred while fetching the profile.");
        }
      }
    };

    fetchProfile();
  }, [user, usn]);

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      maxWidth="md"
      sx={{ pt: { xs: 14, sm: 15 }, pb: { xs: 8, sm: 8 } }}
    >
      <StyledPaper>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
            <SchoolIcon />
          </Avatar>
          <Box>
            <Typography variant="h5">{profile.name}</Typography>
            <Typography variant="subtitle1">{profile.usn}</Typography>
            <Typography variant="subtitle1">CGPA: {profile.cgpa}</Typography>
          </Box>
        </Box>
      </StyledPaper>

      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Enrolled Courses
        </Typography>
        <List>
          {profile.courses.map(({ course, isCompleted }) => (
            <React.Fragment key={course._id}>
              <ListItem
                button
                component={Link}
                to={`/course/${course._id}`}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar>
                    <SchoolIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={course.name}
                  secondary={
                    <>
                      <Typography variant="body2">
                        Credits: {course.credits}
                      </Typography>
                      <Typography variant="body2">
                        Duration: {course.duration} weeks
                      </Typography>
                      <Box mt={1}>
                        <LinearProgress
                          variant="determinate"
                          value={isCompleted ? 100 : 10}
                          color={isCompleted ? "success" : "primary"}
                          sx={{
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: isCompleted ? "green" : "blue",
                            },
                          }}
                        />
                        <Typography variant="body2" color="textSecondary">
                          {isCompleted
                            ? "Completed and Verified"
                            : "In progress"}
                        </Typography>
                      </Box>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </StyledPaper>
    </Container>
  );
};

export default Profile;
