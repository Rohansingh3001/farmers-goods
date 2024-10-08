// src/components/FarmerView.js
import React from 'react';
import ProductUpload from './ProductUploadForm';
import './styles.css';
const FarmerView = ({ products, onProductUpload }) => (
  <>
    <h1 className="text-3xl font-bold mt-6 text-center">Farmers Goods Marketplace - Farmer Dashboard</h1>
    <p className="text-lg text-center">Manage your products and orders</p>

    <section className="w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Upload New Product</h2>
      <ProductUpload onProductUpload={onProductUpload} />
    </section>

    <section className="w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Your Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow">
            <img className="rounded-t-lg w-full" src={product.image} alt={product.name} />
            <h3 className="mt-2 text-lg font-bold text-center">{product.name}</h3>
            <p className="text-gray-600 text-center">₹{product.price}</p>
            <p className="text-gray-600 text-center">{product.description}</p>
            <button className="mt-4 w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2">Edit Product</button>
          </div>
        ))}
      </div>
    </section>

    <section className="w-full max-w-4xl p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Manage Orders</h2>
      <p className="text-gray-600 text-center">Here you can manage and track your orders.</p>
      {/* Add more functionality for order management */}
    </section>
  </>
);

export default FarmerView;
