import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../utils/api';

export const CourseCard = ({ course, onPurchase, isAdmin, onDelete }) => {
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/admin/courses/${course.id}`);
      if (response.data.message === 'Course deleted successfully') {
        onDelete(course.id);
        setOpenDeleteDialog(false);
      } else {
        throw new Error('Failed to delete course');
      }
    } catch (err) {
      console.error('Failed to delete course:', err);
      // You might want to show an error message to the user here
    }
  };

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image={course.imageUrl || 'https://via.placeholder.com/300x200'}
          alt={course.title}
          sx={{
            objectFit: 'cover',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div" noWrap>
            {course.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            {course.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip
              label={`$${course.price}`}
              color="primary"
              sx={{ fontWeight: 600 }}
            />
            {course.published && (
              <Chip
                label="Published"
                color="success"
                size="small"
              />
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          {isAdmin ? (
            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate(`/admin/edit-course/${course.id}`)}
              >
                Edit Course
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => setOpenDeleteDialog(true)}
              >
                Delete
              </Button>
            </Box>
          ) : (
            <Button
              fullWidth
              variant="contained"
              onClick={() => onPurchase(course.id)}
            >
              Purchase Course
            </Button>
          )}
        </CardActions>
      </Card>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{course.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 