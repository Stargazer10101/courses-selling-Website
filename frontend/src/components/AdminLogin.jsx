import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../state/authState';
import { api } from '../api';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from '@mui/material';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/admin/login', { username, password });
      if (response.token) {
        localStorage.setItem('token', response.token);
        setUser({ username, role: 'admin', isLoading: false });
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an admin account?{' '}
              <Link component="button" onClick={() => navigate('/admin/register')}>
                Register
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Not an admin?{' '}
              <Link component="button" onClick={() => navigate('/login')}>
                User Login
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}; 