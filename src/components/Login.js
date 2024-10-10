import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(''); // New userType state
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      console.log('Login successful', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      onLogin(response.data.token, response.data.role);
      setUsername('');
      setPassword('');
      setUserType('');
      navigate('/admin');
    } catch (error) {
      console.error('Login error', error);
      setError('Invalid username or password.');
    }
  };

  const handleRegister = async () => {
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/register', { username, password, role: userType });
      console.log('Registration successful', response.data);
      setIsRegistering(false);
      setUsername('');
      setPassword('');
      setUserType('');
    } catch (error) {
      console.error('Registration error', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={(e) => e.preventDefault()} className="login-form">
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="username">User Name: <span className="required">*</span></label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password: <span className="required">*</span></label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>

        {isRegistering && (
          <div className="form-group">
            <label htmlFor="userType">User Type: <span className="required">*</span></label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select Type...</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="guest">Guest</option>
            </select>
          </div>
        )}

        <button onClick={isRegistering ? handleRegister : handleLogin} className="login-button">
          {isRegistering ? 'Register' : 'Login'}
        </button>

        <p onClick={() => setIsRegistering(!isRegistering)} className="toggle-link">
          {isRegistering ? 'Already have an account? Login' : 'Need to register?'}
        </p>
      </form>
    </div>
  );
};

export default Login;
