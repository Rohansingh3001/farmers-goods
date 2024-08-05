// src/context/AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setShowCart(true);
  };

  const removeCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems((prevItems) => prevItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
    ));
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <AppContext.Provider value={{ cartItems, addToCart, showCart, toggleCart, removeCartItem, updateCartItemQuantity }}>
      {children}
    </AppContext.Provider>
  );
};
