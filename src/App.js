import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/sidebar';
import Footer from './components/footer';
import Home from './components/Home';
import Departments from './components/Departments';
import NewsEvents from './components/NewsEvents';
import CitizenServices from './components/CitizenServes';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Gallary from './components/Gallary';
import Videos from './components/Videos';
import Health from './components/Health';
import Admin from './components/Admin';
import Education from './components/Education';
import Transportation from './components/Transportation';
import PublicWorks from './components/PublicWorks';
import Finance from './components/Finance';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  const handleLogin = (token, userRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole('');
  };

  return (
    <Router>
      <CssBaseline />
      <Navbar isAuthenticated={isAuthenticated} role={role} onLogout={handleLogout} />
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Sidebar />
          <Box
            sx={{
              flexGrow: 1,
              padding: 2,
              marginLeft: '250px',
              overflowY: 'auto',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/news-events" element={<NewsEvents />} />
              <Route path="/citizen-services" element={<CitizenServices />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/gallery" element={<Gallary />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/departments/health" element={<Health />} />
              <Route path="/departments/education" element={<Education />} />
              <Route path="/departments/transportation" element={<Transportation />} />
              <Route path="/departments/PublicWorks" element={<PublicWorks />} />
              <Route path="/departments/finance" element={<Finance />} />
              
              <Route path="/admin" element={isAuthenticated && role === 'Admin' ? <Admin /> : <h2>Access Denied</h2>} />
            </Routes>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
