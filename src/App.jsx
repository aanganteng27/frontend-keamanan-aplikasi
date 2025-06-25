import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
import ProtectedPage from './components/ProtectedPage'; // jika pakai token
import GoogleCallback from './components/GoogleCallback'; // halaman redirect dari Google OAuth

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/protected" element={<ProtectedPage />} />
        <Route path="/google/callback" element={<GoogleCallback />} />
      </Routes>
    </Router>
  );
};

export default App;
