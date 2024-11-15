import { useState, useEffect } from 'react';
import { Grid, Typography, Container, Box } from '@mui/material';
import { CourseCard } from './CourseCard';
import { api } from '../api';

export const AvailableCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/users/courses');
        setCourses(response.courses);
      } catch (error) {
        setError('Failed to fetch courses');
      }
    };
    fetchCourses();
  }, []);

  const handlePurchase = async (courseId) => {
    try {
      await api.post(`/users/courses/${courseId}`);
      // Optionally show a success message or update the UI
    } catch (error) {
      setError('Failed to purchase course');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Courses
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard
              course={course}
              showPurchaseButton={true}
              onPurchase={handlePurchase}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 