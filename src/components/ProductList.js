// src/components/ProductList.js
import React, { useState } from 'react';
import { addToCart } from '../utils/cart';

const ProductList = ({ products }) => {
  const [quantity, setQuantity] = useState({});

  const handleQuantityChange = (id, value) => {
    setQuantity(prev => ({ ...prev, [id]: value }));
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: parseInt(quantity[product.id], 10) || 1 });
    // Add your logic to show CartPopup if necessary
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="border p-4 mb-4">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p>₹{product.price}</p>
          <input
            type="number"
            min="1"
            value={quantity[product.id] || 1}
            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
