import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FarmerLogin = ({ setRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'farmer' && password) {
      setRole('farmer');
      navigate('/farmer-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Farmer Login</h1>
      <input
        type="text"
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full max-w-md text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 mb-2"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default FarmerLogin;
