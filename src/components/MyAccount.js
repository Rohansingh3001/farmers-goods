import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './styles.css'; // Custom CSS styles

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

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem('user');
    navigate('/login');
  };

  const renderCustomerProfile = () => (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Customer Dashboard</h2>
        <button className="button-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="profile-section">
        <div className="profile-picture">
          <img
            src={userInfo.profilePicture || '/default-avatar.png'}
            alt="Profile"
            className="rounded-full"
          />
          <input type="file" onChange={handleProfilePictureUpload} />
          {uploading && <p className="uploading-text">Uploading...</p>}
        </div>
        <div className="profile-info">
          <h3>Profile Information</h3>
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                name="name"
                value={editedInfo.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                type="text"
                name="address"
                value={editedInfo.address}
                onChange={handleChange}
                placeholder="Address"
              />
              <button onClick={handleSave} className="button-save">
                Save
              </button>
            </div>
          ) : (
            <div className="info-text">
              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>Address:</strong> {userInfo.address}</p>
              <button onClick={handleEdit} className="button-edit">
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderFarmerProfile = () => (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Farmer Dashboard</h2>
        <button className="button-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="profile-section">
        <div className="profile-picture">
          <img
            src={userInfo.profilePicture || '/default-avatar.png'}
            alt="Profile"
            className="rounded-full"
          />
          <input type="file" onChange={handleProfilePictureUpload} />
          {uploading && <p className="uploading-text">Uploading...</p>}
        </div>
        <div className="profile-info">
          <h3>Profile Information</h3>
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                name="name"
                value={editedInfo.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                type="text"
                name="address"
                value={editedInfo.address}
                onChange={handleChange}
                placeholder="Address"
              />
              <button onClick={handleSave} className="button-save">
                Save
              </button>
            </div>
          ) : (
            <div className="info-text">
              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>Address:</strong> {userInfo.address}</p>
              <button onClick={handleEdit} className="button-edit">
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="orders-section">
        <h3>Order Management</h3>
        {farmerOrders.length ? (
          <ul className="orders-list">
            {farmerOrders.map((order) => (
              <li key={order.id} className="order-item">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <button
                  onClick={() => handleOrderStatusChange(order.id, 'completed')}
                  className="button-complete"
                >
                  Mark as Completed
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-orders-text">No orders available.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-page">
      {userInfo.role === 'farmer' ? renderFarmerProfile() : renderCustomerProfile()}
    </div>
  );
};

export default MyAccount;
