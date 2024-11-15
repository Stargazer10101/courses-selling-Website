import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { AppBar } from './components/AppBar';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { AdminLogin } from './components/AdminLogin';
import { AdminRegister } from './components/AdminRegister';
import { AvailableCourses } from './components/AvailableCourses';
import { MyCourses } from './components/MyCourses';
import { AdminDashboard } from './components/AdminDashboard';
import { AddCourse } from './components/AddCourse';
import { useRecoilValue } from 'recoil';
import { isUserLoggedIn, isAdminLoggedIn } from './state/authState';

const ProtectedRoute = ({ children, isAdmin }) => {
  const isUser = useRecoilValue(isUserLoggedIn);
  const isAdminUser = useRecoilValue(isAdminLoggedIn);

  if (isAdmin && !isAdminUser) {
    return <Navigate to="/admin/login" />;
  }

  if (!isAdmin && !isUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <RecoilRoot>
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<Navigate to="/courses" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <AvailableCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-course"
            element={
              <ProtectedRoute isAdmin>
                <AddCourse />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;