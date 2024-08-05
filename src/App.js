import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Order from './components/Order';
import MyAccount from './components/MyAccount';
import Login from './components/Login';
import Signup from './components/Signup';
import FarmerLogin from './components/FarmerLogin';
import Footer from './components/Footer';
import CartPopup from './components/CartPopup';
import OrderConfirmation from './components/OrderConfirmation';

import './index.css';
import './i18n';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [role, setRole] = useState('customer');

  const toggleCart = () => {
    setShowCart(!showCart);
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
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeCartItem = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <Router>
      <Navbar onCartClick={toggleCart} />
      <Routes>
        <Route path="/" element={<Home role={role} addToCart={addToCart} />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
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
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/farmer-login" element={<FarmerLogin setRole={setRole} />} />
      </Routes>
      {showCart && (
        <CartPopup
          cartItems={cartItems}
          onClose={toggleCart}
          updateCartItemQuantity={updateCartItemQuantity}
          removeCartItem={removeCartItem}
        />
      )}
      <Footer />
    </Router>
  );
};

export default App;
