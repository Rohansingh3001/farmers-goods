import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css'; // Import your CSS file

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [orderHistory, setOrderHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ ...userInfo });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setUserInfo({
        name: storedUser.name || '',
        email: storedUser.email || '',
        address: storedUser.address || '',
      });
      setOrderHistory(storedUser.orderHistory || []);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserInfo(editedInfo);
    localStorage.setItem('user', JSON.stringify({ ...user, ...editedInfo }));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({ ...editedInfo, [name]: value });
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Please log in to access your account</h1>
          <div className="mt-4">
            <Link to="/login" className="button mr-2">
              Login
            </Link>
            <span className="mx-2">or</span>
            <button onClick={handleSignUp} className="button button-secondary">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mt-6">My Account</h1>
      <div className="w-full max-w-2xl p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={editedInfo.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={editedInfo.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={editedInfo.address}
                onChange={handleChange}
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Address:</strong> {userInfo.address}</p>
            <button
              onClick={handleEdit}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div className="w-full max-w-2xl p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Order History</h2>
        <div className="space-y-4">
          {orderHistory.length > 0 ? (
            orderHistory.map(order => (
              <div key={order.id} className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg">
                <div>
                  <h3 className="text-lg font-bold">{order.name}</h3>
                  <p className="text-gray-600">₹{order.price} x {order.quantity}</p>
                  <p className="text-gray-600">Ordered on: {order.date}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
