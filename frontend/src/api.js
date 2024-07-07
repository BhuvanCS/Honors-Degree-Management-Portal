import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5002/api', 
});

export const register = (data) => api.post('/auth/register', data);

export const getCourseList = () => api.get('/courses');
export const addCourse = (data, token) =>
  api.post('/courses/add', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getStudentProfile = (usn, token) =>
  api.get(`/students/${usn}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
