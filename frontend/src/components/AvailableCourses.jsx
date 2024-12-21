import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Alert } from '@mui/material';
import { api } from '../utils/api';
import { CourseCard } from './CourseCard';

export const AvailableCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/users/courses');
        setCourses(response.data.courses);
      } catch (err) {
        setError('Failed to fetch courses');
      }
    };
    fetchCourses();
  }, []);

  const handlePurchase = async (courseId) => {
    try {
      await api.post(`/users/courses/${courseId}`);
      setCourses(courses.map(course =>
        course.id === courseId ? { ...course, purchased: true } : course
      ));
    } catch (err) {
      setError('Failed to purchase course');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Available Courses
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Browse and purchase our selection of high-quality courses
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {courses.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center">
          No courses available at the moment
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <CourseCard
                course={course}
                onPurchase={handlePurchase}
                isAdmin={false}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}; 