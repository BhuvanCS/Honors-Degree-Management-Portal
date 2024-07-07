import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('token:', token)
        if (token) {
            const { usn } = JSON.parse(atob(token.split('.')[1]));
            console.log(usn)
          const res = await axios.get(`http://localhost:5002/api/students/${usn}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
          console.log(res.data)
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (usn, password) => {
    try {
      const res = await axios.post('http://localhost:5002/api/auth/login', { usn, password });
      console.log(res.data)
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return res;
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
