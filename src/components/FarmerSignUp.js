import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FarmerSignUp = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [productCategory, setProductCategory] = useState('fresh-vegetables');
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Logic for signing up a farmer
    if (password === confirmPassword) {
      // Perform sign-up operation
      console.log({
        name,
        mobileNumber,
        productCategory,
        password,
      });
      navigate('/farmer-login');
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Farmer Sign Up</h1>

      <input
        type="text"
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />

      <select
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
      >
        <option value="fresh-vegetables">Fresh Vegetables</option>
        <option value="organic-fruits">Organic Fruits</option>
        <option value="dairy-products">Dairy Products</option>
      </select>

      <input
        type="password"
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        className="w-full max-w-md text-white bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2 mb-2"
        onClick={handleSignUp}
      >
        Sign Up
      </button>

      <div className="flex justify-between w-full max-w-md">
        <button
          className="text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer"
          onClick={() => navigate('/farmer-login')}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default FarmerSignUp;
