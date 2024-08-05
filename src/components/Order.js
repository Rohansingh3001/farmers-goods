import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Importing bin icon from react-icons
import Footer from './Footer';

const Order = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);

    if (storedCartItems.length === 0) {
      navigate('/');
    }
  }, [navigate]);

  const handlePlaceOrder = () => {
    const orderData = { items: cartItems, date: new Date() };
    console.log('Order placed:', orderData);

    localStorage.removeItem('cartItems');
    localStorage.setItem('orderData', JSON.stringify(orderData));

    navigate('/order-confirmation');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      // Show confirmation pop-up
      if (window.confirm('Are you sure you want to remove this item?')) {
        removeItem(id);
      }
      return;
    }
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col items-center p-4 bg-gray-100">
        <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.name} (₹{item.price} each)</span>
                <div className="flex items-center">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-12 text-center border border-gray-300"
                  />
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                <button
                  className="text-red-500 ml-4"
                  onClick={() => removeItem(item.id)}
                >
                  <FaTrash className="h-6 w-6" />
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right">
            <strong>Total: ₹{getTotalPrice().toFixed(2)}</strong>
          </div>
          <button
            className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
