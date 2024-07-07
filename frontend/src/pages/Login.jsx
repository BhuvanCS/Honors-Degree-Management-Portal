import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import api, { login } from '../api';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ usn, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      console.log(res)

      // Fetch user profile after login
      const profileRes = await api.get(`/students/${res.data.user.usn}`, {
        headers: { Authorization: `Bearer ${res.data.token}` },
      });

      setUser(profileRes.data);
      console.log(user)

      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
        placeholder="USN"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
