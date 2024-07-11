import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Tooltip from '@mui/material/Tooltip';
export default function CourseCard({iscompleted}) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the file here
      console.log('Selected file:', file);
    }
  };
  return (
    <Card sx={{ maxWidth: '100%', height: '100%' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ height: 110, maxWidth: '100%', objectFit: 'cover' }}
          image="/course_image.jpg"
          alt="course image"
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            Course Name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Info
          </Typography>
        </CardContent>
      </CardActionArea>
      {iscompleted?<></>:<CardActions  >
        <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        
         >
          <Tooltip title="Remove Course">
              <IconButton aria-label="remove course" size="small">
              <DeleteIcon />
              </IconButton>
          </Tooltip>
          <Tooltip title="Uplode Certificate">
            {/* Icon button for file upload */}
          <div>
            <input
              accept="image/png, image/jpeg, application/pdf"
              style={{ display: 'none' }}
              id="upload-file-input"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="upload-file-input">
              <IconButton aria-label="upload certificate" component="span" size="small">
                <UploadFileIcon />
              </IconButton>
            </label>
          </div>
          </Tooltip>
       
      
        </Stack>

       
        
      
      </CardActions>}
      
    </Card>
  );
}
