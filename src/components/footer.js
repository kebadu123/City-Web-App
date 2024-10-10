import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: '#1976d2', // Background color
        color: 'white',
        padding: '10px',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Dessie City Administration
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
        <Link href="https://facebook.com" color="inherit" sx={{ margin: '0 10px' }}>
          Facebook
        </Link>
        <Link href="https://twitter.com" color="inherit" sx={{ margin: '0 10px' }}>
          Twitter
        </Link>
        <Link href="https://instagram.com" color="inherit" sx={{ margin: '0 10px' }}>
          Instagram
        </Link>
        <Link href="https://linkedin.com" color="inherit" sx={{ margin: '0 10px' }}>
          LinkedIn
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
