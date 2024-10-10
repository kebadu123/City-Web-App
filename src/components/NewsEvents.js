// components/NewsEvents.js
import React from 'react';
import { Typography, Card, CardContent, Grid, Box } from '@mui/material';

const NewsEvents = () => {
  const news = [
    { title: 'New Park Opening', description: 'The city’s new park will open next week.' },
    { title: 'Public Health Update', description: 'Latest updates on the city’s health initiatives.' },
    { title: 'Annual Budget Release', description: 'Details on the city’s 2024 budget release.' },
    { title: 'Transportation Reforms', description: 'New transportation reforms will come into effect next month.' },
  ];

  return (
    <Box mt={5}>
      <Typography variant="h4" gutterBottom>News & Events</Typography>
      <Grid container spacing={3}>
        {news.map((item, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsEvents;
