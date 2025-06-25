// frontend/src/components/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // ✅ Perbaikan di sini

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal login');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("✅ Google User:", decoded);

      localStorage.setItem('googleUser', JSON.stringify(decoded));
      navigate('/dashboard');
    } catch (error) {
      console.error("❌ Gagal login dengan Google:", error);
      setError("Login Google gagal");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>

        <div style={{ margin: '20px 0' }}>
          <p>Atau login dengan:</p>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError('Login Google gagal')}
            width="300"
          />
        </div>

        <p style={styles.footer}>
          Belum punya akun?{' '}
          <span style={styles.link} onClick={() => navigate('/register')}>
            Daftar di sini
          </span>
        </p>
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
    fontFamily: 'sans-serif',
  },
  card: {
    backgroundColor: '#112240',
    padding: '40px',
    borderRadius: '12px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 0 15px rgba(0,0,0,0.3)',
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    borderBottom: '1px solid #3f5973',
    paddingBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #3f5973',
    backgroundColor: '#0f213a',
    color: 'white',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#64ffda',
    color: '#0a192f',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  footer: {
    marginTop: '20px',
    fontSize: '14px',
  },
  link: {
    color: '#64ffda',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default LoginPage;
