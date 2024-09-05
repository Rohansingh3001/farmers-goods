import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FarmerView from './FarmerView';
import CustomerView from './CustomerView';
import CartPopup from './CartPopup';

const Home = () => {
  const [role, setRole] = useState('customer'); // Set initial role, adjust as needed
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showContent, setShowContent] = useState(false); // State to control content visibility
  const [showWelcome, setShowWelcome] = useState(true); // State to control welcome animation visibility
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

  const proceedToCheckout = () => {
    toggleCart();
    navigate('/order');
  };

  // Control the animation timing
  useEffect(() => {
    const animationDuration = 3000; // 3 seconds for the opening animation
    const timeoutId = setTimeout(() => {
      setShowWelcome(false); // Hide welcome animation after 3 seconds
      setShowContent(true);  // Show the main content
    }, animationDuration);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {showWelcome && (
        <div className="opening-animation">
          <h1 className="text-6xl font-bold text-center text-green-600 animate-fade-in">
            FARMER GOODS
          </h1>
        </div>
      )}

      {showContent && (
        <>
          {role === 'farmer' ? (
            <FarmerView />
          ) : (
            <>
              <CustomerView viewProducts={() => navigate('/products')} />
            </>
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
        </>
      )}
    </div>
  );
};

export default Home;
