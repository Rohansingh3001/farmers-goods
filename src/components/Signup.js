// src/components/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role is customer
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [productType, setProductType] = useState(''); // Dropdown value for farmers
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user information to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        mobile,
        role,
        productType: role === 'farmer' ? productType : null // Only save productType if the user is a farmer
      });

      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <input
        type="text"
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
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
      <input
        type="password"
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <select
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="customer">Customer</option>
        <option value="farmer">Farmer</option>
      </select>
      {role === 'farmer' && (
        <select
          className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        >
          <option value="">Select Product Type</option>
          <option value="freshVegetables">Fresh Vegetables</option>
          <option value="organicFruits">Organic Fruits</option>
          <option value="dairyProducts">Dairy Products</option>
        </select>
      )}
      <button
        className="w-full max-w-md text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
