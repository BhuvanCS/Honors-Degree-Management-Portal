import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import CourseCard from './CourseCard';


export default function CourseSection({iscompleted, title}) {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [expanded, setExpanded] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(7); // Initial visible count

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    if (expanded) {
      setVisibleCount(cards.length); // Show all cards if expanded
    } else {
      setVisibleCount(6); // Show initial visibleCount cards when collapsed
    }
  }, [expanded]);

  return (
        <Paper sx={{ padding: 2 }} elevation={3}>
        <Stack
          direction="row"
          sx={{ paddingBottom: 2 }}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography gutterBottom variant="h5" component="div" sx={{ mb: 3 }}>
            {title}
          </Typography>
          <div>
            {iscompleted?<></>:<Button   variant="text" startIcon={<AddIcon />}>
              Add Course
            </Button>}
           
            <Button
              variant="text"
              onClick={handleExpandClick}
              size="small"
              color={expanded ? 'secondary' : 'primary'}
            >
              {expanded ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        </Stack>

        <Divider />

        <Grid container spacing={2} columns={12} sx={{height:'40%', pt:2}}>
          {cards.map((number, index) => (
            <Grid item key={number.toString()} xs={12} sm={4} md={4} lg={2}>
              <Collapse in={index < visibleCount} timeout="auto" unmountOnExit>
                  <CourseCard iscompleted={iscompleted}/>     //Course cards
              </Collapse>
            </Grid>
          ))}
        </Grid>
      </Paper> 
  );
}
