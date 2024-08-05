import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isAddressSubmitted, setIsAddressSubmitted] = useState(false);
  const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const navigate = useNavigate();

  const cartItems = useMemo(() => JSON.parse(localStorage.getItem('cartItems')) || [], []);
  const orderData = useMemo(() => JSON.parse(localStorage.getItem('orderData')) || {}, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  useEffect(() => {
    const savedOrderData = JSON.parse(localStorage.getItem('finalOrderData')) || {};
    setFinalPrice(savedOrderData.finalPrice || getTotalPrice());
  }, [getTotalPrice]);

  const handleAddressSubmit = (event) => {
    event.preventDefault();
    setIsAddressSubmitted(true);
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    const discountedPrice = getTotalPrice(); 
    setFinalPrice(discountedPrice);

    const finalOrderData = {
      ...orderData,
      address,
      city,
      state,
      zip,
      paymentMethod,
      finalPrice: discountedPrice
    };
    localStorage.setItem('finalOrderData', JSON.stringify(finalOrderData));
    setIsPaymentSubmitted(true);
  };

  useEffect(() => {
    if (isPaymentSubmitted) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isPaymentSubmitted, navigate]);

  const renderCartItems = () => {
    return cartItems.map((item, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between">
          <span className="font-bold">{item.name}</span>
          <span>₹{item.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Quantity: {item.quantity}</span>
          <span>Total: ₹{(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {!isPaymentSubmitted ? (
        !isAddressSubmitted ? (
          <form className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-lg" onSubmit={handleAddressSubmit}>
            <h1 className="text-3xl font-bold mb-6">Delivery Address</h1>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                Address:
              </label>
              <textarea
                id="address"
                className="w-full p-2 border rounded"
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
                City:
              </label>
              <input
                type="text"
                id="city"
                className="w-full p-2 border rounded"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block text-gray-700 font-bold mb-2">
                State:
              </label>
              <input
                type="text"
                id="state"
                className="w-full p-2 border rounded"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="zip" className="block text-gray-700 font-bold mb-2">
                ZIP Code:
              </label>
              <input
                type="text"
                id="zip"
                className="w-full p-2 border rounded"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              Proceed with Payment
            </button>
          </form>
        ) : (
          <form className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-lg" onSubmit={handlePaymentSubmit}>
            <h1 className="text-3xl font-bold mb-6">Payment Options</h1>
            {renderCartItems()}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Payment Method:
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${paymentMethod === 'creditCard' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setPaymentMethod('creditCard')}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${paymentMethod === 'debitCard' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setPaymentMethod('debitCard')}
                >
                  Debit Card
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${paymentMethod === 'netBanking' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setPaymentMethod('netBanking')}
                >
                  Net Banking
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${paymentMethod === 'cod' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  Cash on Delivery
                </button>
              </div>
            </div>
            <div className="mb-4 text-right">
              <strong>Total: ₹{getTotalPrice().toFixed(2)}</strong>
            </div>
            <div className="mb-4 text-right text-xl font-bold">
              <strong>Final Price: ₹{finalPrice.toFixed(2)}</strong>
              {console.log(finalPrice)}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              Submit
            </button>
          </form>
        )
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
          <p className="text-lg mb-4">Thank you for your order!</p>
          <p>Your order has been placed and will be delivered soon.</p>
          <p>You will be redirected to the home page in 5 seconds.</p>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
