import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext.jsx';
// import AdminDashboard from './pages/Admin/AdminDashboard';
// import StudentDashboard from './pages/Student/StudentDashboard';


const ProtectedRoute = ({ children, role }) => {
    const { user } = useContext(AuthContext);
  
    if (!user) {
      return <Navigate to="/login" />;
    }
  
    if (role && user.role !== role) {
      return <Navigate to="/login" />;
    }
  
    return children;
  };
  
  function AppRoutes() {
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminPage />
                </ProtectedRoute>
              }
            />
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
