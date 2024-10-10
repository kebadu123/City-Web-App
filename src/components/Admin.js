import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [news, setNews] = useState([]);
  const [newNews, setNewNews] = useState('');
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchNews();
    fetchFeedback();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/news');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news', error);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/feedback');
      setFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback', error);
    }
  };

  const handlePostNews = async () => {
    if (!newNews) return; // Ensure there's news to post

    try {
      await axios.post('http://localhost:5000/api/news', { content: newNews });
      setNewNews(''); // Clear the input
      fetchNews(); // Refresh news list
    } catch (error) {
      console.error('Error posting news', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Post News</h3>
      <textarea
        value={newNews}
        onChange={(e) => setNewNews(e.target.value)}
        placeholder="Write news here..."
        rows={4}
        style={{ width: '100%' }}
      />
      <button onClick={handlePostNews}>Post News</button>

      <h3>News List</h3>
      <ul>
        {news.map((item, index) => (
          <li key={index}>{item.content}</li>
        ))}
      </ul>

      <h3>User Feedback</h3>
      <ul>
        {feedback.map((item, index) => (
          <li key={index}>{item.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
