import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
  const [data, setData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    axios.get('http://localhost:5000/api/protected', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => setData(res.data.message))
    .catch(err => {
      console.error("❌ Access denied:", err);
      navigate('/');
    });
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔒 Halaman Terproteksi</h1>
      <p>{data}</p>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0a192f',
    color: 'white',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  }
};

export default ProtectedPage;
