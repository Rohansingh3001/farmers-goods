// src/utils/cart.js
export const addToCart = (item) => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if item already exists in the cart
    const itemIndex = existingCartItems.findIndex(cartItem => cartItem.id === item.id);
    
    if (itemIndex > -1) {
        // Update quantity if the item is already in the cart
        existingCartItems[itemIndex].quantity += item.quantity;
    } else {
        // Add new item to cart
        existingCartItems.push(item);
    }
    
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
};

export const getCartItems = () => {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
};

export const clearCart = () => {
    localStorage.removeItem('cartItems');
};
