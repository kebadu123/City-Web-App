import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';

const Videos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/videos'); // Update endpoint as needed

      // Extract only video URLs from the news entries
      const videoUrls = response.data
        .filter(news => news.video) // Keep only entries with a video
        .map(news => ({
          url: `http://localhost:5000/${news.video}` // Format URL for displaying videos
        }));

      setVideos(videoUrls); // Set the state to the list of video URLs
    } catch (error) {
      console.error('Error fetching videos', error);
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="h5" gutterBottom>
        Videos
      </Typography>
      <Grid container spacing={2}>
        {videos.map((videoObj, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <video
              controls
              src={videoObj.url} // Use the formatted URL
              style={{ width: '100%', height: 'auto' }}
            >
              Your browser does not support the video tag.
            </video>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Videos;
