// ProductUploadForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ProductUploadForm = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleImageChange = (event) => {
    setProductImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('image', productImage);

    try {
      const response = await axios.post('/api/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </label>
      <label>
        Product Description:
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Product Price:
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
      </label>
      <label>
        Product Image:
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </label>
      <button type="submit">Upload Product</button>
    </form>
  );
};

export default ProductUploadForm;
