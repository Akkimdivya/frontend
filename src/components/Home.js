import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  }

  const handleLogIn = () => {
    navigate('/login');
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleSignUp} style={{ margin: '10px', padding: '10px 20px' }}>Sign Up</button>
      <button onClick={handleLogIn} style={{ margin: '10px', padding: '10px 20px' }}>Log In</button>
    </div>
  );
}

export default Home;


