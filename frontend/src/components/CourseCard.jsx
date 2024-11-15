import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

export const CourseCard = ({ course, showPurchaseButton, onPurchase }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={course.imageUrl || 'https://via.placeholder.com/345x140'}
        alt={course.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {course.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${course.price}
          </Typography>
          {showPurchaseButton && (
            <Button variant="contained" onClick={() => onPurchase(course.id)}>
              Purchase
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}; 