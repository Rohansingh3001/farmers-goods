import React, { useState, useEffect } from 'react';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import ProductUpload from './ProductUploadForm';
import { getAuth, signOut } from 'firebase/auth'; 
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Go up one directory from `components` to `src`
 // Import the configured Firestore instance

const FarmerDashboard = ({ products = [], onProductUpload }) => {
  const [showForm, setShowForm] = useState(false);
  const [farmers, setFarmers] = useState([]);
  const auth = getAuth(); 

  // Fetch farmers' details from Firestore
  const fetchFarmers = async () => {
    try {
      const farmersCollection = collection(db, 'farmers');
      const farmersSnapshot = await getDocs(farmersCollection);
      const farmersList = farmersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFarmers(farmersList);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mt-6 text-center">Farmer Dashboard</h1>

      {/* Logout Button */}
      <button
        className="bg-red-600 text-white hover:bg-red-700 rounded px-4 py-2 mb-4 float-right"
        onClick={handleLogout}
      >
        <FaSignOutAlt size={16} /> Logout
      </button>

      {/* Centered Product Upload Section with Background Image */}
      <section className="flex justify-center mt-10">
        <div
          className="w-full max-w-3xl p-8 bg-white bg-opacity-80 border border-gray-200 rounded-lg shadow-lg"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1058401/pexels-photo-1058401.jpeg?auto=compress&cs=tinysrgb&w=600')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold mb-4 flex-1">
              <strong>Add New Product</strong>
            </h2>
            <button
              className="bg-blue-600 text-white hover:bg-blue-700 rounded px-3 py-1 text-sm font-medium focus:outline-none"
              onClick={toggleForm}
            >
              <FaPlus size={16} />
            </button>
          </div>

          {/* Conditionally render the form if showForm is true */}
          {showForm && (
            <div className="mt-6">
              <ProductUpload onProductUpload={onProductUpload} />
            </div>
          )}
        </div>
      </section>

      {/* Products Display Section */}
      <section className="w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow mt-10 mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Your Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={index}
                className="max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-lg"
              >
                <img
                  className="rounded-t-lg w-full"
                  src={product.image}
                  alt={product.name}
                />
                <h3 className="mt-2 text-lg font-bold text-center">{product.name}</h3>
                <p className="text-gray-600 text-center">₹{product.price}</p>
                <p className="text-gray-600 text-center">{product.description}</p>
                <button className="mt-4 w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2">
                  Edit Product
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No products available.</p>
          )}
        </div>
      </section>

      {/* Farmers Display Section */}
      <section className="w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow mt-10 mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Farmers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmers.length > 0 ? (
            farmers.map((farmer, index) => (
              <div
                key={index}
                className="max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-lg"
              >
                <h3 className="mt-2 text-lg font-bold text-center">{farmer.name}</h3>
                <p className="text-gray-600 text-center">{farmer.email}</p>
                <p className="text-gray-600 text-center">{farmer.phone}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No farmers available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default FarmerDashboard;
