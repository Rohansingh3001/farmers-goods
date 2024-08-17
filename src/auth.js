// src/auth.js
import { auth, db } from './firebase'; // Adjust the import path if necessary
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Farmer Login Function
export const loginFarmer = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if the user exists in the farmersCredentials collection
    const farmerDoc = await getDoc(doc(db, 'farmersCredentials', user.uid));
    if (farmerDoc.exists()) {
      return { success: true, user: farmerDoc.data() };
    } else {
      throw new Error('No farmer data found');
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Customer Login Function
export const loginCustomer = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if the user exists in the customerCredentials collection
    const customerDoc = await getDoc(doc(db, 'customerCredentials', user.uid));
    if (customerDoc.exists()) {
      return { success: true, user: customerDoc.data() };
    } else {
      throw new Error('No customer data found');
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};
