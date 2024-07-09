import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Container, Paper, Box } from '@mui/material';

const guidelines = [
  {
    title: "Eligibility for Registration",
    points: [
      "The student is eligible to register for B.E/B.Tech. Honors Programmes at their 5th-semester level by paying a one-time nonrefundable Registration fee of Rs. 1,000/-",
      "The student shall have obtained a grade >C in all the courses in the first attempt only, in all the semesters until the 4th semester (including the 4th semester)",
      "The students should have obtained a CGPA >7.5 at the end of the 4th semester.",
      "The Diploma lateral entry students should have completed all the subjects/courses during 3rd and 4th semesters on the first attempt only including bridge courses if any.",
      "The B.Sc. lateral entry B.Sc. students should have completed the Engineering Graphics and Elements of Civil Engineering of the first-year Engineering program by the end of the IV semester on the first attempt only."
    ],
    ordered: true
  },
  {
    title: "Procedure for Registration",
    points: [
      {
        main: "The students have to register online through https://online.vtu.ac.in",
        subpoints: [
          "Click on the Sign-in button on the top right corner.",
          "If the students are new users, click on Create an account.",
          "Fill in your e-mail ID, phone number, and name, and create a new password. Click Sign Up, and enter OTP.",
          "Log in by entering your e-mail ID and password.",
          "You will be taken to the student dashboard. Click on Academics on the top right corner then Click on Apply for Honour Degree.",
          "Fill up the details and submit the form.",
          "The College mentors for the honours degree program have to assist the student in the registration, and autonomous colleges have to verify and approve the registrations."
        ]
      },
      "The non-refundable Registration fees of Rs.1000/- shall be paid through the registration portal only. No other payment mode is accepted.",
      "This year (2023-24) registration is permitted only to students with USN xxxZ1xxxxx (Regular), USN xxx2Zt<x4>rx (Diploma Lateral Entry), and USN xxx22xx6xx (B.Sc. Lateral Entry).",
      "There shall be no limit on the intake for registration to B.E./B. Tech Honours.",
      "The registrant shall abide by the regulations governing the award of 'Honours' at B.E./B.Tech. Degree programs and other norms and guidelines issued from time to time."
    ],
    ordered: true
  }
];

const Guidelines = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
      <Container sx={{ alignSelf: "center" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ marginBottom: '1rem', color: (theme) => theme.palette.primary.main }}
        >
          B.E/B.Tech. Honors Programmes Registration Guidelines
        </Typography>
        {guidelines.map((section, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              marginTop: '2.5rem',
              padding: '1.5rem',
              backgroundColor: (theme) => theme.palette.background.default,
              width: '100%', // Set the width to 100% for full width
             
              textAlign: 'left', // Align text content left within Paper
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              gutterBottom
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              {section.title}
            </Typography>
            {section.ordered ? (
              <ol>
                {section.points.map((point, idx) => (
                  typeof point === 'string' ? (
                    <li key={idx} sx={{ marginBottom: '1rem' }}>
                      <Typography variant='body1'>{point}</Typography>
                    </li>
                  ) : (
                    <li key={idx} sx={{ marginBottom: '1rem' }}>
                      <Typography variant='body1'>{point.main}</Typography>
                      <ul>
                        {point.subpoints.map((subPoint, subIdx) => (
                          <li key={subIdx} sx={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
                            <Typography variant='body1'>{subPoint}</Typography>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )
                ))}
              </ol>
            ) : (
              <List>
                {section.points.map((point, idx) => (
                  <ListItem key={idx} sx={{ paddingLeft: 0, marginBottom: '0.5rem' }}>
                    <ListItemText primary={point} />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        ))}
      </Container>
    </Box>
  );
};

export default Guidelines;
