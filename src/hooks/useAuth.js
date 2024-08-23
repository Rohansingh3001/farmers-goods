import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null); // Track the user role (customer or farmer)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const customerDocRef = doc(db, 'customerCredentials', currentUser.uid);
          const farmerDocRef = doc(db, 'farmersCredentials', currentUser.uid);

          let profileData = null;

          // Check if the user is a customer
          const customerDoc = await getDoc(customerDocRef);
          if (customerDoc.exists()) {
            profileData = customerDoc.data();
            setRole('customer');
          } else {
            // If not a customer, check if the user is a farmer
            const farmerDoc = await getDoc(farmerDocRef);
            if (farmerDoc.exists()) {
              profileData = farmerDoc.data();
              setRole('farmer');
            }
          }

          if (profileData) {
            setProfile(profileData);
          }

          setUser(currentUser);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUser(null);
        setProfile(null);
        setRole(null); // Reset role when user logs out
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, profile, role };
};
