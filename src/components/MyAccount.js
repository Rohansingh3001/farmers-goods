import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const MyAccount = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check the user's role from a custom claim or database
        user.getIdTokenResult().then((idTokenResult) => {
          const role = idTokenResult.claims.role || ''; // Assume 'role' is stored in custom claims

          if (role === 'farmer') {
            navigate('/FarmerDashboard');
          } else if (role === 'customer') {
            navigate('/CustomerDashboard');
          } else {
            // If no role, redirect to login page or handle it as needed
            navigate('/login');
          }
        });
      } else {
        // If no user is logged in, redirect to the login page
        navigate('/login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, navigate]);

  return (
    <div>
      <h2>Loading your account...</h2>
    </div>
  );
};

export default MyAccount;
