import { AppBar as MuiAppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, isUserLoggedIn, isAdminLoggedIn } from '../state/authState';

export const AppBar = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);
  const isUser = useRecoilValue(isUserLoggedIn);
  const isAdmin = useRecoilValue(isAdminLoggedIn);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser({ username: null, role: null, isLoading: false });
    navigate('/');
  };

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Course Store
        </Typography>
        <Box>
          {!user.username && !user.isLoading && (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Register
              </Button>
              <Button color="inherit" onClick={() => navigate('/admin/register')}>
                Admin Register
              </Button>
            </>
          )}
          {isUser && (
            <>
              <Button color="inherit" onClick={() => navigate('/courses')}>
                Courses
              </Button>
              <Button color="inherit" onClick={() => navigate('/my-courses')}>
                My Courses
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          {isAdmin && (
            <>
              <Button color="inherit" onClick={() => navigate('/admin/dashboard')}>
                Dashboard
              </Button>
              <Button color="inherit" onClick={() => navigate('/admin/add-course')}>
                Add Course
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}; 