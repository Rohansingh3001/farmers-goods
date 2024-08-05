import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmerView from './FarmerView';
import CustomerView from './CustomerView';
import CartPopup from './CartPopup';

const Home = () => {
  const [role, setRole] = useState('customer'); // Set initial role, adjust as needed
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart items from local storage on initial render
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  // Save cart items to local storage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleCart = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    setShowCart(true);
  };

  const proceedToCheckout = () => {
    toggleCart();
    navigate('/order');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {role === 'farmer' ? (
        <FarmerView />
      ) : (
        <CustomerView addToCart={addToCart} />
      )}
      {showCart && (
        <CartPopup
          cartItems={cartItems}
          onClose={toggleCart}
          proceedToCheckout={proceedToCheckout}
          setCartItems={setCartItems}
        />
      )}
      {!showCart && (
        <button
          onClick={toggleCart}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded"
        >
          View Cart
        </button>
      )}
    </div>
  );
};

export default Home;
