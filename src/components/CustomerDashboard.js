// src/components/CustomerDashboard.js
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { AiOutlinePlus } from 'react-icons/ai';

const CustomerDashboard = () => {
  const { user, loading, profile } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  if (loading) return <p>Loading...</p>;

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage || !user) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(storageRef, selectedImage);
      const downloadURL = await getDownloadURL(storageRef);

      // Update the profile picture URL in Firestore
      await updateDoc(doc(db, 'customerCredentials', user.uid), {
        profilePicture: downloadURL,
      });

      alert('Profile picture updated successfully!');
      setSelectedImage(null); // Clear the selected image after successful upload
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-100">
      {user && (
        <>
          <h1 className="text-3xl font-bold mb-6">
            Welcome, {profile?.name || 'User'}
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md flex items-center">
            {/* Profile Picture Section */}
            <div className="relative w-28 h-28 rounded-full bg-gray-200 shadow-md mr-6">
              {profile?.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <label htmlFor="imageUpload" className="absolute inset-0 flex items-center justify-center cursor-pointer">
                  <AiOutlinePlus className="text-4xl text-gray-600" />
                </label>
              )}
              <input
                id="imageUpload"
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Details Section */}
            <div className="flex-1 text-left">
              <p className="mb-2"><strong>Name:</strong> {profile?.name || 'N/A'}</p>
              <p className="mb-2"><strong>Email:</strong> {user.email}</p>
              <p className="mb-2"><strong>Phone:</strong> {profile?.phone || 'N/A'}</p>

              {/* Submit Button - Visible only when an image is selected */}
              {selectedImage && (
                <button
                  onClick={handleUpload}
                  className="mt-4 bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Submit Profile Picture'}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerDashboard;
