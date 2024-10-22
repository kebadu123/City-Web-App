import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons';

const getFormattedDate = () => {
  const date = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);
  const cityName = "Kombolcha";
  return `${cityName}/${formattedDate}`;
};

const Admin = () => {
  const [news, setNews] = useState([]);
  const [newNews, setNewNews] = useState({ content: '', department: '' });
  const [selectedNews, setSelectedNews] = useState(null);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState('');
  const [deleteType, setDeleteType] = useState('all'); // Combo box for delete type
  const [departments, setDepartments] = useState([]);
  const [commentInput, setCommentInput] = useState({});
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    fetchDepartments();
    fetchNews('Health'); // Default department
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/departments`);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments', error);
    }
  };

  const fetchNews = async (department) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/news/${department}`);
      setNews(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setMessage('');
    } catch (error) {
      console.error('Error fetching news', error);
      setMessage('Error fetching news, please try again later.');
    }
  };

  const handlePostOrUpdateNews = async () => {
    if (!newNews.content || !newNews.department) {
      setMessage('Please fill in both the department and content fields.');
      return;
    }

    const formData = new FormData();
    formData.append('department', newNews.department);
    formData.append('content', newNews.content);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    try {
      if (selectedNews) {
        await axios.put(`http://localhost:5000/api/news/${selectedNews._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage('News updated successfully.');
      } else {
        await axios.post('http://localhost:5000/api/news', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage('News posted successfully.');
      }

      setNewNews({ content: '', department: '' });
      setImage(null);
      setVideo(null);
      setSelectedNews(null);
      fetchNews(newNews.department);
    } catch (error) {
      console.error('Error posting/updating news', error);
      setMessage('Error posting/updating news, please try again.');
    }
  };

  const handleEditNews = (newsItem) => {
    setSelectedNews(newsItem);
    setNewNews({ content: newsItem.content, department: newsItem.department });
    setImage(null);
    setVideo(null);
  };

  const handleDeleteNews = async (id, type) => {
    try {
      if (type === 'all') {
        await axios.delete(`http://localhost:5000/api/news/${id}`);
        setMessage('News deleted successfully.');
      } else if (type === 'content') {
        await axios.put(`http://localhost:5000/api/news/${id}/deleteContent`);
        setMessage('Content deleted successfully.');
      } else if (type === 'image') {
        await axios.put(`http://localhost:5000/api/news/${id}/deleteImage`);
        setMessage('Image deleted successfully.');
      } else if (type === 'video') {
        await axios.put(`http://localhost:5000/api/news/${id}/deleteVideo`);
        setMessage('Video deleted successfully.');
      }
      fetchNews(newNews.department);
    } catch (error) {
      console.error('Error deleting news', error);
      setMessage('Error deleting news, please try again.');
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/news/${id}/like`);
      fetchNews(newNews.department); // Refresh the news after liking
    } catch (error) {
      console.error('Error liking news', error);
    }
  };

  const handleDislike = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/news/${id}/dislike`);
      fetchNews(newNews.department); // Refresh the news after disliking
    } catch (error) {
      console.error('Error disliking news', error);
    }
  };

  const handleComment = async (id) => {
    const comment = commentInput[id];
    if (!comment || !comment.trim()) return;

    try {
      await axios.put(`http://localhost:5000/api/news/${id}/comment`, { comment });
      fetchNews(newNews.department); // Refresh the news after commenting
      setCommentInput({ ...commentInput, [id]: '' }); // Clear input field
    } catch (error) {
      console.error('Error commenting on news', error);
    }
  };

  const toggleComments = (id) => {
    setShowComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setNewNews({ ...newNews, department: selectedDepartment });
    fetchNews(selectedDepartment); // Fetch news based on selected department
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}

      <h3>{selectedNews ? 'Edit News' : 'Post News'}</h3>
      
      {/* Department dropdown */}
      <select
        value={newNews.department}
        onChange={handleDepartmentChange}
      >
        <option value="">Select Department</option>
        {departments.map((dept, index) => (
          <option key={index} value={dept}>{dept}</option>
        ))}
      </select>

      {/* Content text area */}
      <textarea
        value={newNews.content}
        onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
        placeholder="Write news here..."
        rows={4}
        style={{ width: '100%', marginTop: '10px' }}
      />

      {/* Image and video upload */}
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        style={{ display: 'block', marginTop: '10px' }}
      />
      <input
        type="file"
        onChange={(e) => setVideo(e.target.files[0])}
        accept="video/*"
        style={{ display: 'block', marginTop: '10px' }}
      />

      {/* Post/Update button */}
      <button
        onClick={handlePostOrUpdateNews}
        style={{ marginTop: '10px' }}
      >
        {selectedNews ? 'Update News' : 'Post News'}
      </button>

      <h3>News List</h3>
      <ul>
        {news.map((item, index) => (
          <li key={index} style={{ marginBottom: '20px', position: 'relative' }}>
            <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{getFormattedDate()}</p>
            
            {/* Edit and Delete icons */}
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
              <button onClick={() => handleEditNews(item)}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
              <button onClick={() => handleDeleteNews(item._id, deleteType)} style={{ marginLeft: '10px' }}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>

              {/* ComboBox for delete type */}
              <select
                value={deleteType}
                onChange={(e) => setDeleteType(e.target.value)}
                style={{ marginLeft: '10px' }}
              >
                <option value="all">Delete All</option>
                <option value="content">Delete Content</option>
                <option value="image">Delete Image</option>
                <option value="video">Delete Video</option>
              </select>
            </div>

            <p>{item.content}</p>

            {/* Display image if available */}
            {item.image && <img src={`http://localhost:5000/${item.image}`} alt="news" style={{ maxWidth: '100%', height: 'auto' }} />}

            {/* Display video if available */}
            {item.video && (
              <video controls style={{ width: '100%', marginTop: '10px' }}>
                <source src={`http://localhost:5000/${item.video}`} type="video/mp4" />
              </video>
            )}

            {/* Like, Dislike, and Comment icons */}
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => handleLike(item._id)}>
                <FontAwesomeIcon icon={faThumbsUp} /> {item.likes.length}
              </button>
              <button onClick={() => handleDislike(item._id)} style={{ marginLeft: '10px' }}>
                <FontAwesomeIcon icon={faThumbsDown} /> {item.dislikes.length}
              </button>
              <button onClick={() => toggleComments(item._id)} style={{ marginLeft: '10px' }}>
                <FontAwesomeIcon icon={faComment} /> {item.comments.length}
              </button>
            </div>

            {/* Show comments when clicked */}
            {showComments[item._id] && (
              <div style={{ marginTop: '10px' }}>
                <h4>Comments:</h4>
                <ul>
                  {item.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
                <input
                  type="text"
                  value={commentInput[item._id] || ''}
                  onChange={(e) => setCommentInput({ ...commentInput, [item._id]: e.target.value })}
                  placeholder="Write a comment..."
                  style={{ width: '100%' }}
                />
                <button onClick={() => handleComment(item._id)}>Comment</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
