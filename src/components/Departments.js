import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, Typography, Box, Card, CardContent, Grid } from '@mui/material';

const Departments = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDepartments, setShowDepartments] = useState(false);

  // List of Departments
  const departments = [
    { name: 'Health', description: 'City Health Services' },
    { name: 'Education', description: 'City Education Department' },
    { name: 'Public Works', description: 'City Public Works Department' },
    { name: 'Transportation', description: 'City Transportation Services' },
    { name: 'Finance', description: 'City Finance and Taxation Department' },
  ];

  // Handle opening dropdown
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowDepartments(true);
  };

  // Handle closing dropdown
  const handleClose = () => {
    setAnchorEl(null);
    setShowDepartments(false);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {/* Departments Dropdown */}
          <Button
            aria-controls="departments-menu"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            Departments
          </Button>

          {/* Dropdown Menu */}
          <Menu
            id="departments-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {departments.map((dept, index) => (
              <MenuItem key={index} onClick={handleClose}>
                {dept.name}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Show Departments List */}
      {showDepartments && (
        <Box mt={5}>
          <Typography variant="h4" gutterBottom>City Departments</Typography>
          <Grid container spacing={3}>
            {departments.map((dept, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{dept.name}</Typography>
                    <Typography variant="body2">{dept.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Departments;
