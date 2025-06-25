// frontend/src/components/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ Perbaikan di sini
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/');
      return;
    }

    try {
      const decoded = jwtDecode(token); // Validasi token
      setUser(JSON.parse(userData));
    } catch (err) {
      console.error("❌ Token invalid", err);
      navigate('/');
    }
  }, [navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>👋 Selamat Datang di Dashboard</h1>
        {user && (
          <div style={styles.info}>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}
        <button style={styles.logout} onClick={() => {
          localStorage.clear();
          navigate('/');
        }}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#0a192f',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'sans-serif',
  },
  card: {
    backgroundColor: '#112240',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 0 20px rgba(0,0,0,0.4)',
    width: '90%',
    maxWidth: '500px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  info: {
    marginBottom: '20px',
    lineHeight: '1.8',
  },
  logout: {
    padding: '10px 20px',
    backgroundColor: '#64ffda',
    color: '#0a192f',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};

export default DashboardPage;
