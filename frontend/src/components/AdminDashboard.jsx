import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Container, Button, Box } from '@mui/material';
import { CourseCard } from './CourseCard';
import { api } from '../api';

export const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/admin/courses');
        setCourses(response.courses);
      } catch (error) {
        setError('Failed to fetch courses');
      }
    };
    fetchCourses();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/admin/add-course')}
        >
          Add New Course
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course} showPurchaseButton={false} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 