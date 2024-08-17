// src/components/FarmerLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginFarmer } from '../auth'; // Import the login function

const FarmerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await loginFarmer(email, password);
    if (result.success) {
      navigate('/farmer-dashboard');
    } else {
      alert(result.error);
    }
  };

  return (
    <div>
      {/* Farmer Login Form */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login as Farmer</button>
    </div>
  );
};

export default FarmerLogin;
