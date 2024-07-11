import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
export default function CourseCard({iscompleted}) {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };
  const handleSubmit = () => {
    console.log('Submitted link:', link);
    // Handle the submitted link here
    handleClose();
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
          <div>
      <IconButton aria-label="upload link" size="small" onClick={handleClickOpen}>
        <UploadFileIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Link</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="link"
            label="Link"
            type="url"
            fullWidth
            variant="outlined"
            value={link}
            onChange={handleLinkChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
              
          </Tooltip>
        </Stack>
      </CardActions>}
      
    </Card>
  );
}
