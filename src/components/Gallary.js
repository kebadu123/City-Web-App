import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/gallery'); // Update endpoint as needed

      // Extract only image URLs from the news entries
      const imageUrls = response.data
        .filter(news => news.image) // Keep only entries with an image
        .map(news => ({
          url: `http://localhost:5000/${news.image}` // Format URL for displaying images
        }));

      setImages(imageUrls); // Set the state to the list of image URLs
    } catch (error) {
      console.error('Error fetching gallery images', error);
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="h5" gutterBottom>
        Gallery
      </Typography>
      <Grid container spacing={2}>
        {images.map((imageObj, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <img
              src={imageObj.url} // Use the formatted URL
              alt="Gallery"
              style={{ width: '100%', height: 'auto' }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Gallery;
