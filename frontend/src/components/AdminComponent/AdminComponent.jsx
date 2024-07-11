import * as React from "react";
import { Box, ThemeProvider } from "@mui/material";
import RegisteredStudentList from "../adminpage/RegisteredStudentList";
// import StudentList from "./Certificate_verification/StudentList";
export default function AdminComponent() {
  return (
    <Box sx={{ p: 2 }}>
      <RegisteredStudentList />
      {/* <StudentList /> */}
    </Box>
  );
}
