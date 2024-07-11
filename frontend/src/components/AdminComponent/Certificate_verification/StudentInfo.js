import * as React from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function StudentInfo() {
  const location = useLocation();
  const data = location.state;
  console.log(data)
  return (
    <Typography
    component="h1"
    variant="h6"
    color="inherit"
    noWrap
    sx={{ flexGrow: 1 }}
  >
  {data.name}
  </Typography>
  );
}