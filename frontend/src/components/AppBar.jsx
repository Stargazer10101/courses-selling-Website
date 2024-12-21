import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
} from '@mui/material';
import { isUserLoggedIn, isAdminLoggedIn, userState } from '../state/authState';

export const AppBar = () => {
  const isUser = useRecoilValue(isUserLoggedIn);
  const isAdmin = useRecoilValue(isAdminLoggedIn);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setUser({ username: null, role: null, isLoading: false });
    navigate('/login');
  };

  return (
    <MuiAppBar position="static" elevation={1}>
      <Toolbar>
        <Box
          component="img"
          src="/logo.png"
          alt="CourseHub"
          sx={{
            height: 40,
            mr: 2,
            display: { xs: 'none', sm: 'block' },
          }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
          CourseHub
        </Typography>
        <Stack direction="row" spacing={2}>
          {!isUser && !isAdmin && (
            <>
              <Button
                color="inherit"
                onClick={() => navigate('/login')}
                sx={{ fontWeight: 500 }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/register')}
                sx={{ fontWeight: 500 }}
              >
                Register
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/admin/register')}
                sx={{ fontWeight: 500 }}
              >
                Admin Register
              </Button>
            </>
          )}
          {isUser && (
            <>
              <Button
                color="inherit"
                onClick={() => navigate('/courses')}
                sx={{ fontWeight: 500 }}
              >
                Available Courses
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/my-courses')}
                sx={{ fontWeight: 500 }}
              >
                My Courses
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ fontWeight: 500 }}
              >
                Logout
              </Button>
            </>
          )}
          {isAdmin && (
            <>
              <Button
                color="inherit"
                onClick={() => navigate('/admin/dashboard')}
                sx={{ fontWeight: 500 }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/admin/add-course')}
                sx={{ fontWeight: 500 }}
              >
                Add Course
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ fontWeight: 500 }}
              >
                Logout
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </MuiAppBar>
  );
}; 