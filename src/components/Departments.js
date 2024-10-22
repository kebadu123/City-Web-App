import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';

const Departments = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [departmentNews, setDepartmentNews] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const departments = [
    { name: 'Health', description: 'City Health Services' },
    { name: 'Education', description: 'City Education Department' },
    { name: 'PublicWorks', description: 'City Public Works Department' },
    { name: 'Transportation', description: 'City Transportation Services' },
    { name: 'Finance', description: 'City Finance and Taxation Department' },
  ];

  useEffect(() => {
    if (selectedDepartment) {
      fetchNewsByDepartment(selectedDepartment);
    }
  }, [selectedDepartment]);

  const fetchNewsByDepartment = async (department) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/news/${department}`);
      setDepartmentNews(response.data);
    } catch (error) {
      console.error('Error fetching department news', error);
    }
  };

  const handleDepartmentClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (department) => {
    setAnchorEl(null);
    setSelectedDepartment(department);
  };

  return (
    <div>
      {/* Department Menu */}
      <Button
        color="primary"
        onClick={handleDepartmentClick}
        style={{ margin: '16px' }}
      >
        Departments
      </Button>

      {/* Dropdown Menu for Departments */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {departments.map((dept, index) => (
          <MenuItem key={index} onClick={() => handleMenuClose(dept.name)}>
            {dept.name}
          </MenuItem>
        ))}
      </Menu>

      {/* Display News for Selected Department */}
      {selectedDepartment && (
        <Box mt={2}>
          <Typography variant="h5" gutterBottom>
            {selectedDepartment} Department News
          </Typography>

          <Grid container spacing={2}>
            {departmentNews.map((news, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="body1">{news.content}</Typography>
                    {news.image && (
                      <img src={`http://localhost:5000/${news.image}`} alt="news" style={{ width: '100%' }} />
                    )}
                    {news.video && (
                      <video controls src={`http://localhost:5000/${news.video}`} style={{ width: '100%' }} />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default Departments;
