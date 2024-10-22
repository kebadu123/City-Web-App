import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, role, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // Add useNavigate

  const handleLogout = () => {
    onLogout();
    navigate('/login'); // Redirect to login page
  };

  // List of Departments
  const departments = [
    { name: 'Health', description: 'City Health Services' },
    { name: 'Education', description: 'City Education Department' },
    { name: 'PublicWorks', description: 'City Public Works Department' },
    { name: 'Transportation', description: 'City Transportation Services' },
    { name: 'Finance', description: 'City Finance and Taxation Department' },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <img
            src="/images/123.webp" // Replace with your logo path
            alt="Dessie City Logo"
            style={{ height: '70px', marginRight: '30px' }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dessie City Administration
          </Typography>

          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button aria-controls="departments-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
            Departments
          </Button>

          <Menu
            id="departments-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {departments.map((dept, index) => (
              <MenuItem
                key={index}
                onClick={handleClose}
                component={Link}
                to={`/departments/${dept.name.toLowerCase()}`}
              >
                {dept.name}
              </MenuItem>
            ))}
          </Menu>

          <Button component={Link} to="/news-events" color="inherit">News & Events</Button>
          <Button component={Link} to="/citizen-services" color="inherit">Citizen Services</Button>
          <Button component={Link} to="/contact-us" color="inherit">Contact Us</Button>

          {!isAuthenticated ? (
            <Button component={Link} to="/login" color="inherit">Login</Button>
          ) : (
            <>
              {role === 'Admin' && (
                <Button component={Link} to="/admin" color="inherit">Post News</Button>
              )}
              <Button onClick={onLogout} color="inherit">Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Spacer for fixed navbar */}
    </Box>
  );
};

export default Navbar;
