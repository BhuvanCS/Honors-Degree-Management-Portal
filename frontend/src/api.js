import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002/api",
});

export const register = (data) => api.post("/auth/register", data);

export const getCourseList = () => api.get("/courses");

export const addCourse = (data, token) =>
  api.post("/courses/add", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getCourseDetails = (courseId, token) =>
  api.get(`/courses/${courseId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getCourseStudents = (courseId, token) =>
  api.get(`/studentcourse/progress/${courseId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const verifyCompletion = (data, token) =>
  api.patch("/studentcourse/verifyCourse", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllStudents = (token) =>
  api.get(`/students/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getProfile = (usn, token) =>
  api.get(`/students/${usn}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getStudentProfile = (usn, token) =>
  api.get(`/students/${usn}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const enrollToCourse = (data, token) =>
  api.post('/studentcourse/add', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const uploadCertificate = (data, token) =>
  api.patch('/studentcourse/uploadCertificate', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
