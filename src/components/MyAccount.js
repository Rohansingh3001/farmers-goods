import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase'; // Import your Firebase configuration
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './styles.css'; // Import your CSS file

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
    role: '',
    profilePicture: '',
  });
  const [orderHistory, setOrderHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ ...userInfo });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [farmerOrders, setFarmerOrders] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        const userRef = doc(db, 'users', storedUser.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUser(storedUser);
          setUserInfo({
            name: userData.name || '',
            email: userData.email || '',
            address: userData.address || '',
            role: userData.role || '',
            profilePicture: userData.profilePicture || '',
          });
          setOrderHistory(userData.orderHistory || []);
          setSavedAddresses(userData.savedAddresses || []);
          setFarmerOrders(userData.farmerOrders || []);
        }
      } else {
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, editedInfo);
      setUserInfo(editedInfo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({ ...editedInfo, [name]: value });
  };

  const handleOrderStatusChange = async (orderId, status) => {
    const updatedOrders = farmerOrders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    setFarmerOrders(updatedOrders);
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, { farmerOrders: updatedOrders });
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { profilePicture: downloadURL });
        setUserInfo((prevInfo) => ({ ...prevInfo, profilePicture: downloadURL }));
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const renderCustomerProfile = () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <img
          src={userInfo.profilePicture || '/default-avatar.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
        <input type="file" onChange={handleProfilePictureUpload} />
        {uploading && <p>Uploading...</p>}
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Customer Profile</h2>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Address:</strong> {userInfo.address}</p>
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              value={editedInfo.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-2"
            />
            <input
              type="text"
              name="address"
              value={editedInfo.address}
              onChange={handleChange}
              placeholder="Address"
              className="border p-2"
            />
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2">Save</button>
          </div>
        ) : (
          <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2">Edit</button>
        )}
      </div>
    </div>
  );

  const renderFarmerProfile = () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <img
          src={userInfo.profilePicture || '/default-avatar.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
        <input type="file" onChange={handleProfilePictureUpload} />
        {uploading && <p>Uploading...</p>}
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Farmer Profile</h2>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Address:</strong> {userInfo.address}</p>
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              value={editedInfo.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-2"
            />
            <input
              type="text"
              name="address"
              value={editedInfo.address}
              onChange={handleChange}
              placeholder="Address"
              className="border p-2"
            />
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2">Save</button>
          </div>
        ) : (
          <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2">Edit</button>
        )}
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Orders</h2>
        {farmerOrders.length ? (
          <ul>
            {farmerOrders.map((order) => (
              <li key={order.id} className="border p-4 mb-2">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <button
                  onClick={() => handleOrderStatusChange(order.id, 'completed')}
                  className="bg-green-500 text-white px-4 py-2"
                >
                  Mark as Completed
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {userInfo.role === 'farmer' ? renderFarmerProfile() : renderCustomerProfile()}
    </div>
  );
};

export default MyAccount;
