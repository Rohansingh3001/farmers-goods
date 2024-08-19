// src/components/FarmerLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const FarmerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch farmer data from Firestore
      const userDoc = await getDoc(doc(db, 'farmersCredentials', user.uid));

      if (userDoc.exists()) {
        navigate('/farmer-dashboard'); // Redirect to farmer's dashboard
      } else {
        alert('No farmer data found!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Farmer Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
      />
      <button
        onClick={handleLogin}
        className="w-full max-w-md text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
      >
        Login
      </button>
    </div>
  );
};

export default FarmerLogin;
