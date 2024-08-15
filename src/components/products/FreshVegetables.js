import React, { useState } from 'react';

const FreshVegetables = ({ addToCart }) => {
  const freshVegetables = [
    { id: 1, name: 'Carrots', sellers: [{ id: 1, name: 'Seller A', price: 80.00 }, { id: 2, name: 'Seller B', price: 85.00 }], image: 'https://placehold.co/150x150/eeeeee/4B5563/png?text=Carrots' },
    { id: 2, name: 'Tomatoes', sellers: [{ id: 3, name: 'Seller A', price: 60.00 }, { id: 4, name: 'Seller B', price: 65.00 }], image: 'https://placehold.co/150x150/eeeeee/4B5563/png?text=Tomatoes' },
    { id: 3, name: 'Spinach', sellers: [{ id: 5, name: 'Seller A', price: 40.00 }, { id: 6, name: 'Seller B', price: 42.00 }], image: 'https://placehold.co/150x150/eeeeee/4B5563/png?text=Spinach' },
    { id: 4, name: 'Broccoli', sellers: [{ id: 7, name: 'Seller A', price: 120.00 }, { id: 8, name: 'Seller B', price: 125.00 }], image: 'https://placehold.co/150x150/eeeeee/4B5563/png?text=Broccoli' },
    { id: 5, name: 'Peas', sellers: [{ id: 9, name: 'Seller A', price: 90.00 }, { id: 10, name: 'Seller B', price: 95.00 }], image: 'https://placehold.co/150x150/eeeeee/4B5563/png?text=Peas' },
    { id: 6, name: 'Potatoes', sellers: [{ id: 11, name: 'Seller A', price: 40.00 }, { id: 12, name: 'Seller B', price: 42.00 }], image: 'https://placehold.co/150x150/eeeeee/4B5563/png?text=Potatoes' },
    { id: 7, name: 'Onions', sellers: [{ id: 13, name: 'Seller A', price: 50.00 }, { id: 14, name: 'Seller B', price: 55.00 }], image: 'https://placehold.co/150x150/eeeeee/4B5563/png?text=Onions' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Fresh Vegetables</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {freshVegetables.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product, addToCart }) => {
  const [selectedSeller, setSelectedSeller] = useState(product.sellers[0]);
  const [quantity, setQuantity] = useState(1);

  const handleSellerChange = (e) => {
    const sellerId = parseInt(e.target.value);
    const seller = product.sellers.find((seller) => seller.id === sellerId);
    setSelectedSeller(seller);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col items-center w-full max-w-xs">
      <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-3 rounded" />
      <p className="text-lg font-semibold text-center truncate">{product.name}</p>
      <div className="mt-2 w-full">
        <label className="block text-gray-700 text-sm">Select Seller:</label>
        <select value={selectedSeller.id} onChange={handleSellerChange} className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm">
          {product.sellers.map((seller) => (
            <option key={`${product.id}-${seller.id}`} value={seller.id}>
              {seller.name}: ₹{seller.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2 w-full">
        <label className="block text-gray-700 text-sm">Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
        />
      </div>
      <button onClick={() => addToCart({ ...product, price: selectedSeller.price, seller: selectedSeller.name, quantity })} className="mt-2 bg-green-500 text-white p-2 rounded w-full text-sm">
        Add to Cart
      </button>
    </div>
  );
};

export default FreshVegetables;
