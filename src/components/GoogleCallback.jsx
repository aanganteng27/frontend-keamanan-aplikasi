import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        alert('Kode Google tidak ditemukan!');
        return;
      }

      try {
        const res = await axios.post('http://localhost:5000/api/auth/google/callback', { code });
        const { token, user } = res.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        navigate('/dashboard');
      } catch (err) {
        console.error('❌ Error Google Callback:', err);
        alert('Gagal login dengan Google');
        navigate('/');
      }
    };

    getToken();
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.text}>⏳ Sedang memproses login Google...</h2>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0a192f',
    color: '#64ffda',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif'
  },
  text: {
    fontSize: '18px'
  }
};

export default GoogleCallback;
