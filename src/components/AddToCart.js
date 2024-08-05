import React, { useState } from 'react';

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Fresh Vegetables', price: 185, quantity: 1 },
    { id: 2, name: 'Organic Fruits', price: 225, quantity: 2 },
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mt-6">Shopping Cart</h1>
      <div className="w-full max-w-2xl p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg">
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <h3 className="text-lg font-bold">Total:</h3>
              <p className="text-lg font-bold">₹{getTotalPrice()}</p>
            </div>
            <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">Proceed to Checkout</button>
          </div>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
