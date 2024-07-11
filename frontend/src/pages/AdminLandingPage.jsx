import * as React from "react";
import { Box, ThemeProvider } from "@mui/material";
import RegisteredStudentList from "../components/adminpage/RegisteredStudentList";
import CertificateVerificationList from "../components/adminpage/CertificateVerificationList";


export default function AdminLandingPage() {
  return (
    <Box sx={{ p: 2 , pt: { xs: 14, sm: 15 }, pb: { xs: 8, sm: 8 }}}>
      <RegisteredStudentList />
      <CertificateVerificationList />
    </Box>
  );
}
