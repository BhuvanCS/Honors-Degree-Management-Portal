import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import AuthContext, { AuthProvider } from './context/AuthContext.jsx';
import RegisterPage from './pages/Register';
import CourseList from './pages/CourseList.jsx';
import Logout from './components/Logout.jsx';
import CourseDashboard from './pages/CourseDashboard.jsx';
// import AdminDashboard from './pages/Admin/AdminDashboard';
// import StudentDashboard from './pages/Student/StudentDashboard';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const { usn } = JSON.parse(atob(token.split('.')[1]));
            const res = await axios.get(`http://localhost:5002/api/students/${usn}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data);
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        }
      }
    };

    if (!user && !loading) {
      fetchUser();
    }
  }, [user, loading, setUser]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Additional role-based access control
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page if roles don't match
  }

  return children;
};

function AppRoutes() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <nav>
            <Logout />
          </nav>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courselist" element={<CourseList />} />
          <Route
            path="/coursedashboard"
            element={
              <ProtectedRoute role="admin">
                <CourseDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-course"
            element={
              <ProtectedRoute role="admin">
                <AddCourseForm />
              </ProtectedRoute>
            }
          />
          {/* 
          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <StudentPage />
              </ProtectedRoute>
            }
          /> */}
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRoutes;
