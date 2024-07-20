import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://moengage-b3ot.onrender.com/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/search');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        className="input-field"
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="input-field"
      />
      <button onClick={handleLogin} className="button">Login</button>
    </div>
  );
}

export default Login;
