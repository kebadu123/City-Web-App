// components/CitizenServices.js
import React from 'react';
import { Typography, Card, CardContent, Grid, Box } from '@mui/material';

const CitizenServices = () => {
  const services = [
    { name: 'Waste Management', description: 'Waste collection and disposal services' },
    { name: 'Water Services', description: 'Clean water supply services' },
    { name: 'Housing Support', description: 'Affordable housing and property management' },
    { name: 'Public Transport', description: 'Bus, train, and other public transportation services' },
  ];
  return (
    <Box mt={5}>
      <Typography variant="h4" gutterBottom>Citizen Services</Typography>
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{service.name}</Typography>
                <Typography variant="body2">{service.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CitizenServices;
