import { useState, useEffect } from 'react';
import { Grid, Typography, Container, Box } from '@mui/material';
import { CourseCard } from './CourseCard';
import { api } from '../api';

export const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await api.get('/users/purchasedCourses');
        setCourses(response.purchasedCourses);
      } catch (error) {
        setError('Failed to fetch purchased courses');
      }
    };
    fetchPurchasedCourses();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Courses
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {courses.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          You haven't purchased any courses yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard course={course} showPurchaseButton={false} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}; 