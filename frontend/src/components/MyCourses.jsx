import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Alert } from '@mui/material';
import { api } from '../utils/api';
import { CourseCard } from './CourseCard';

export const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/users/purchasedCourses');
        setCourses(response.data.purchasedCourses);
      } catch (err) {
        setError('Failed to fetch purchased courses');
      }
    };
    fetchCourses();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          My Courses
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Access and manage your purchased courses
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {courses.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            You haven't purchased any courses yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse our available courses to start learning
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <CourseCard
                course={course}
                isAdmin={false}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}; 