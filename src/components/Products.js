import React from 'react';

const Product = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mt-6">Our Products</h1>
      <div className="w-full max-w-4xl p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Available Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow">
            <img className="rounded-t-lg" src="https://placehold.co/300x200/eeeeee/4B5563/png?text=Vegetables" alt="Vegetables" />
            <h3 className="mt-2 text-lg font-bold">Fresh Vegetables</h3>
            <p className="text-gray-600">₹185.00 per kg</p>
            <button className="mt-4 w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2">Add to Cart</button>
          </div>
          <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow">
            <img className="rounded-t-lg" src="https://placehold.co/300x200/eeeeee/4B5563/png?text=Fruits" alt="Fruits" />
            <h3 className="mt-2 text-lg font-bold">Organic Fruits</h3>
            <p className="text-gray-600">₹225.00 per kg</p>
            <button className="mt-4 w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2">Add to Cart</button>
          </div>
          <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow">
            <img className="rounded-t-lg" src="https://placehold.co/300x200/eeeeee/4B5563/png?text=Dairy" alt="Dairy Products" />
            <h3 className="mt-2 text-lg font-bold">Dairy Products</h3>
            <p className="text-gray-600">₹112.50 per liter</p>
            <button className="mt-4 w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
