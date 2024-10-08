import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import AuthContext, { AuthProvider } from "./context/AuthContext.jsx";
import RegisterPage from "./pages/Register";
import CourseList from "./pages/CourseList.jsx";

import CourseDashboard from "./pages/CourseDashboard.jsx";
import AddCourse from "./pages/AddCourse.jsx";
import Profile from "./pages/Profile.jsx";
import Logout from "./components/shared/Logout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Layout from "./components/Layout.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import StudentList from "./pages/StudentList.jsx";
import StudentLandingPage from "./pages/StudentLandingPage.jsx";
import CourseListEnroll from "./pages/CourseListEnroll.jsx";
import AdminLandingPage from "./pages/AdminLandingPage.jsx";
// import AdminDashboard from './pages/Admin/AdminDashboard';
// import StudentDashboard from './pages/Student/StudentDashboard';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const { usn } = JSON.parse(atob(token.split(".")[1]));
            const res = await axios.get(
              `http://localhost:5002/api/students/${usn}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            setUser(res.data);
          } catch (error) {
            console.error("Error fetching user:", error);
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
  if (role && role === "admin" && user.role === "student") {
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page if roles don't match
  }

  return children || <Outlet />;
};

function AppRoutes({ mode, toggleColorMode }) {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            element={<Layout mode={mode} toggleColorMode={toggleColorMode} />}
          >
            <Route
              path="/"
              element={
                <LandingPage mode={mode} toggleColorMode={toggleColorMode} />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/courselist" element={<CourseList />} />
            <Route
              path="/student"
              element={
                <ProtectedRoute role="student">
                  <StudentLandingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminLandingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courselist/enroll"
              element={
                <ProtectedRoute role="student">
                  <CourseListEnroll />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coursedashboard"
              element={
                <ProtectedRoute role="admin">
                  <CourseDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course/:courseId"
              element={
                <ProtectedRoute role="admin">
                  <CourseDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-course"
              element={
                <ProtectedRoute role="admin">
                  <AddCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/allstudents"
              element={
                <ProtectedRoute role="admin">
                  <StudentList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:usn?"
              element={
                <ProtectedRoute role="student">
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRoutes;
