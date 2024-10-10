import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        position: 'fixed',
        backgroundColor: '#f0f0f0',
        padding: 2,
        boxShadow: 2,
      }}
    >
      <List>
        <ListItem component={Link} to="/gallery">
          <ListItemText primary="Gallery" />
        </ListItem>
        <ListItem component={Link} to="/videos">
          <ListItemText primary="Videos" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
