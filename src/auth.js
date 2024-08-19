// src/components/Auth.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async () => {
    setError(''); // Clear any previous error messages
    try {
      if (isSignUp) {
        // Sign-Up Logic
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Define collection based on role
        const collection = role === 'farmer' ? 'farmersCredentials' : 'customerCredentials';

        // Save additional user data in Firestore
        await setDoc(doc(db, collection, user.uid), {
          name,
          email,
          role,
        });

        // Navigate to the appropriate dashboard
        navigate(role === 'farmer' ? '/farmer-dashboard' : '/customer-dashboard');
      } else {
        // Login Logic
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Determine the correct collection based on the role
        const collection = role === 'farmer' ? 'farmersCredentials' : 'customerCredentials';
        const userDoc = await getDoc(doc(db, collection, user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Redirect based on role
          if (userData.role === 'farmer') {
            navigate('/farmer-dashboard');
          } else if (userData.role === 'customer') {
            navigate('/customer-dashboard');
          } else {
            setError('Role mismatch. Please check your role.');
          }
        } else {
          setError('No user data found for this account.');
        }
      }
    } catch (error) {
      setError(error.message); // Show error message on failure
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        {isSignUp ? 'Sign Up' : 'Login'} as {role.charAt(0).toUpperCase() + role.slice(1)}
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
      {isSignUp && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        />
      )}
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
        onClick={handleAuth}
        className="w-full max-w-md text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
      >
        {isSignUp ? 'Sign Up' : 'Login'}
      </button>
      <div className="mt-4">
        <span
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 cursor-pointer"
        >
          {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
        </span>
      </div>
      <div className="mt-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="customer">Customer</option>
          <option value="farmer">Farmer</option>
        </select>
      </div>
    </div>
  );
};

export default Auth;
