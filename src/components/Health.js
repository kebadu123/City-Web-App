import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons';

const Health = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchHealthNews();
  }, []);

  const fetchHealthNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/news/Health'); // Ensure this endpoint is correct
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching health news', error);
    }
  };

  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Box mt={2}>
      <Typography variant="h5" gutterBottom>
        Health Department News
      </Typography>
      <Grid container spacing={2}>
        {news.map((newsItem) => (
          <Grid item xs={12} sm={6} md={4} key={newsItem._id}>
            <NewsCard news={newsItem} truncateContent={truncateContent} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const NewsCard = ({ news, truncateContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likeCount, setLikeCount] = useState(news.likes || 0);
  const [dislikeCount, setDislikeCount] = useState(news.dislikes || 0);
  const [comments, setComments] = useState(news.comments || []);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false); // State to manage visibility of comments

  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const contentToShow = isExpanded ? news.content : truncateContent(news.content, 100);

  const handleLike = async () => {
    setLikeCount(likeCount + 1);
    try {
      await axios.put(`http://localhost:5000/api/news/${news._id}/like`);
    } catch (error) {
      console.error('Error liking the news item', error);
    }
  };

  const handleDislike = async () => {
    setDislikeCount(dislikeCount + 1);
    try {
      await axios.put(`http://localhost:5000/api/news/${news._id}/dislike`);
    } catch (error) {
      console.error('Error disliking the news item', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setNewComment('');

      try {
        await axios.put(`http://localhost:5000/api/news/${news._id}/comment`, { comment: newComment });
      } catch (error) {
        console.error('Error submitting comment', error);
      }
    }
  };

  const toggleCommentsVisibility = () => {
    setShowComments(!showComments);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="body1">{contentToShow}</Typography>
        <Button onClick={toggleExpanded} style={{ marginTop: '10px', marginBottom: '10px' }}>
          {isExpanded ? 'Show Less' : 'See More'}
        </Button>
        <div>
          <FontAwesomeIcon icon={faThumbsUp} onClick={handleLike} style={{ cursor: 'pointer', marginRight: '10px' }} />
          <span>{likeCount}</span>
          <FontAwesomeIcon icon={faThumbsDown} onClick={handleDislike} style={{ cursor: 'pointer', marginLeft: '20px', marginRight: '10px' }} />
          <span>{dislikeCount}</span>
          <FontAwesomeIcon icon={faComment} onClick={toggleCommentsVisibility} style={{ cursor: 'pointer', marginLeft: '20px', marginRight: '10px' }} />
          <span>{comments.length}</span>
        </div>

        {/* Comment Input */}
        <TextField
          label="Write a comment"
          variant="outlined"
          size="small"
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ marginTop: '10px' }}
        />
        <Button onClick={handleCommentSubmit} variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Submit Comment
        </Button>

        {/* Comments Section */}
        {showComments && (
          <div style={{ marginTop: '10px' }}>
            {comments.map((comment, index) => (
              <Typography key={index} variant="body2" style={{ marginBottom: '5px' }}>
                - {comment}
              </Typography>
            ))}
          </div>
        )}

        {/* Optional: Show image and video if they exist */}
        {news.image && <img src={`http://localhost:5000/${news.image}`} alt="news" style={{ width: '100%', marginTop: '10px' }} />}
        {news.video && <video controls src={`http://localhost:5000/${news.video}`} style={{ width: '100%', marginTop: '10px' }} />}
      </CardContent>
    </Card>
  );
};

export default Health;
