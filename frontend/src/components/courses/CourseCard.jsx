import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AuthContext from "../../context/AuthContext";
import { uploadCertificate } from "../../api";

export default function CourseCard({ course }) {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const { user } = React.useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };
  const handleSubmit = async () => {
    console.log("Submitted link:", link);

    try {
      const data = {
        courseId: course.course.courseId,
        usn: user.usn,
        certificateLink: link,
      };
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      console.log("Token:", token);
      console.log("Data:", data);

      // Call the uploadCertificate API
      const response = await uploadCertificate(data, token);

      alert("Successfully Submitted certificate for course " + course.courseId);
    } catch (error) {
      console.error("Error uploading certificate:", error.message);
    }

    handleClose();
  };

  return (
    <Card sx={{ maxWidth: "100%", height: "100%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ height: 110, maxWidth: "100%", objectFit: "cover" }}
          image="/course_image.jpg"
          alt="course image"
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            {course.course.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.course.subject}
          </Typography>
        </CardContent>
      </CardActionArea>
      {course.isCompleted ? (
        <></>
      ) : (
        <CardActions>
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
                <IconButton
                  aria-label="upload link"
                  size="small"
                  onClick={handleClickOpen}
                >
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
        </CardActions>
      )}
    </Card>
  );
}
