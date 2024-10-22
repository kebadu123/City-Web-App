import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, Typography, Button } from '@mui/material';
import axios from 'axios';

const Finance = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchFinanceNews();
  }, []);

  const fetchFinanceNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/news/Finance'); // Fetch Finance news
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching finance news', error);
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="h5" gutterBottom>
        Finance Department News
      </Typography>
      <Grid container spacing={2}>
        {news.map((newsItem, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <NewsCard news={newsItem} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const NewsCard = ({ news }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const contentToShow = isExpanded ? news.content : truncateContent(news.content, 100); // Display full content or truncated version

  return (
    <Card>
      <CardContent>
        <Typography variant="body1">
          {contentToShow}
        </Typography>

        <Button onClick={toggleExpanded} style={{ marginTop: '10px', marginBottom: '10px' }}>
          {isExpanded ? 'Show Less' : 'See More'}
        </Button>

        {news.image && (
          <img
            src={`http://localhost:5000/${news.image}`}
            alt="news"
            style={{ width: '100%', marginTop: '10px' }}
          />
        )}

        {news.video && (
          <video controls src={`http://localhost:5000/${news.video}`} style={{ width: '100%', marginTop: '10px' }} />
        )}
      </CardContent>
    </Card>
  );
};

const truncateContent = (content, maxLength) => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + '...';
};

export default Finance;
