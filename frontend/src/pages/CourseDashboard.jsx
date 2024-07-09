import * as React from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
// import CourseInfo from "./CourseInfo";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { getCourseList } from "../api";
import { Box } from "@mui/material";
const columns = [
  // {
  //   field: "action",headerName: "Action",sortable: false,
  //   renderCell: (params) => {
  //     return <DropDown />
  //   }
  // },
  {
    field: "name",
    headerName: "Course",
    minWidth: 200,
    width: 440,
    flex: 1,
  },
  {
    field: "subject",
    headerName: "Subject",
    minWidth: 200,
    width: 130,
    flex: 1,
  },
  {
    field: "duration",
    headerName: "Duration",
    minWidth: 40,
    width: 40,
    flex: 1,
  },
  { field: "credits", headerName: "Credits", minWidth: 40, width: 40, flex: 1 },
  {
    field: "startdate",
    headerName: "Start Date",
    minWidth: 150,
    width: 130,
    flex: 1,
  },
  {
    field: "examdate",
    headerName: "Exam Date",
    minWidth: 150,
    width: 130,
    flex: 1,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />

      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Change density" } }}
      />
      
      <GridToolbarExport
      
      />
      <AddCourse />
    </GridToolbarContainer>
  );
}

export default function CourseDashboard() {
  const navigate = useNavigate();
  const [coursedata, setCoursedata] = React.useState([]);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourseList();
        response.data = response.data.map((course, index) => ({ ...course, id: course.courseId || index}))
        setCoursedata(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleRowClick = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    navigate("/courseinfo", { state: params.row });
  };

  return (
    <Box sx={{ height: 400, width: "100%", pt: { xs: 14, sm: 15 }, pb: { xs: 8, sm: 8 } }}>
      <DataGrid
        onRowClick={handleRowClick}
        rows={coursedata}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
       
        slots={{
          toolbar: CustomToolbar,
        }}

        sx = {{pl:2, pt: 2}}
      />
    </Box>
  );
}

function AddCourse() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/add-course');
    };
  return (
    <Button variant="text" startIcon={<AddIcon />} onClick={handleClick}>
      Add Record
    </Button>
  );
}
