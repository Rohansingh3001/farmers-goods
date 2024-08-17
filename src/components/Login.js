// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // default to customer
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const collection = role === 'farmer' ? 'farmersCredentials' : 'customerCredentials';
      const userDoc = await getDoc(doc(db, collection, user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Navigate based on user role
        if (role === 'farmer') {
          navigate('/farmer-dashboard');
        } else {
          navigate('/customer-dashboard');
        }
      } else {
        alert('No user data found!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <select
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="customer">Customer</option>
        <option value="farmer">Farmer</option>
      </select>
      <input
        type="email"
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <div className="flex justify-between w-full max-w-md">
        <button
          className="text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </button>
        <button
          className="text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
