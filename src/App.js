import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import AddToCart from './components/AddToCart';
import Order from './components/Order';
 // Correct path to your MyAccount component
import Login from './components/Login'; // Correct path to your Login component
import Signup from './components/Signup'; // Correct path to your Signup component
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add-to-cart" element={<AddToCart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
