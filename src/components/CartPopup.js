import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPopup = ({ cartItems, onClose, setCartItems }) => {
  const navigate = useNavigate();

  // Handle the removal of an item from the cart
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate the total price of all items in the cart and store it in localStorage
  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    localStorage.setItem('finalOrderPrice', totalPrice.toFixed(2)); // Store the total price in localStorage
    return totalPrice;
  };

  // Navigate to the order page for checkout
  const proceedToCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/order');
      onClose(); // Close the cart popup after navigating
    }
  };

  // Effect to close the cart if the cartItems become empty
  useEffect(() => {
    if (cartItems.length === 0) {
      onClose();
    }
  }, [cartItems, onClose]);

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
      <button
        aria-label="Close Cart"
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        &times;
      </button>
      <h2 className="text-lg font-bold mb-2">Your Cart</h2>
      <ul>
        {cartItems.length === 0 ? (
          <li>Your cart is empty</li>
        ) : (
          cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} (x{item.quantity}) - ₹{item.price.toFixed(2)}</span>
              <button
                aria-label={`Remove ${item.name} from cart`}
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
      {cartItems.length > 0 && (
        <>
          <div className="mt-4 text-right">
            <strong>Total: ₹{getTotalPrice().toFixed(2)}</strong>
          </div>
          <button
            aria-label="Proceed to Checkout"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={proceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPopup;
