import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import FreshVegetables from './components/products/FreshVegetables';
import OrganicFruits from './components/products/OrganicFruits';
import DairyProducts from './components/products/DairyProducts';
import About from './components/About';
import Contact from './components/Contact';
import Order from './components/Order';
import MyAccount from './components/MyAccount';
import Login from './components/LoginPage';
import SignUp from './components/RegisterPage';
import Footer from './components/Footer';
import CartPopup from './components/CartPopup';
import OrderConfirmation from './components/OrderConfirmation';
import FarmerDashboard from './components/FarmerDashboard';
import CustomerDashboard from './components/CustomerDashboard';

import './index.css';
import './i18n';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [role, setRole] = useState('customer'); // Default to customer role
  const [user, setUser] = useState(null); // State to store user info

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setRole(storedUser.role);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id && i.seller === item.seller);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id && i.seller === item.seller
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prevItems, { ...item, quantity: item.quantity }];
      }
    });
    setShowCart(true);
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeCartItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const proceedToCheckout = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <Router>
      <Navbar onCartClick={toggleCart} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home role={role} addToCart={addToCart} />} />
          <Route path="/products/fresh-vegetables" element={<FreshVegetables addToCart={addToCart} />} />
          <Route path="/products/organic-fruits" element={<OrganicFruits addToCart={addToCart} />} />
          <Route path="/products/dairy-products" element={<DairyProducts addToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/order"
            element={
              <Order
                cartItems={cartItems}
                updateCartItemQuantity={updateCartItemQuantity}
                removeCartItem={removeCartItem}
              />
            }
          />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route
            path="/MyAccount"
            element={
              user ? (
                role === 'farmer' ? <FarmerDashboard /> : <CustomerDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login setRole={setRole} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        {showCart && (
          <CartPopup
            cartItems={cartItems}
            onClose={toggleCart}
            proceedToCheckout={proceedToCheckout}
            setCartItems={setCartItems}
          />
        )}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
