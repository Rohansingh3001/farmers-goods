import React, { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust the import based on your Firebase setup
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login'); // Redirect to login if no user is found
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-100">
      <h1 className="text-3xl font-bold">Welcome to the Customer Dashboard</h1>
      <p className="mt-4">Hello, {user ? user.displayName : 'Guest'}!</p>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
      >
        <FaSignOutAlt size={16} className="mr-2" /> Logout
      </button>

      {/* Add more customer-specific functionality here */}
    </div>
  );
};

export default CustomerDashboard;
