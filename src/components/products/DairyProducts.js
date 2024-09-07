import React, { useState } from 'react';

const DairyProducts = ({ addToCart }) => {
  const dairyProducts = [
    { id: 1, name: 'Milk', sellers: [{ id: 1, name: 'Seller A', price: 112.50 }, { id: 2, name: 'Seller B', price: 115.00 }], image: 'https://placehold.co/150x150/eeeeee/4B5563/png?text=Milk' },
    { id: 2, name: 'Cheese', sellers: [{ id: 3, name: 'Seller A', price: 300.00 }, { id: 4, name: 'Seller B', price: 305.00 }], image: 'https://placehold.co/150x150/eeeeee/4B5563/png?text=Cheese' },
    { id: 3, name: 'Butter', sellers: [{ id: 5, name: 'Seller A', price: 250.00 }, { id: 6, name: 'Seller B', price: 255.00 }], image: 'https://placehold.co/150x150/eeeeee/4B5563/png?text=Butter' },
    { id: 4, name: 'Yogurt', sellers: [{ id: 7, name: 'Seller A', price: 50.00 }, { id: 8, name: 'Seller B', price: 55.00 }], image: 'https://placehold.co/150x150/eeeeee/4B5563/png?text=Yogurt' },
    { id: 5, name: 'Cream', sellers: [{ id: 9, name: 'Seller A', price: 150.00 }, { id: 10, name: 'Seller B', price: 155.00 }], image: 'https://placehold.co/150x150/eeeeee/4B5563/png?text=Cream' },
    { id: 6, name: 'Paneer', sellers: [{ id: 11, name: 'Seller A', price: 200.00 }, { id: 12, name: 'Seller B', price: 205.00 }], image: 'https://placehold.co/150x150/eeeeee/4B5563/png?text=Paneer' },
    { id: 7, name: 'Ghee', sellers: [{ id: 13, name: 'Seller A', price: 400.00 }, { id: 14, name: 'Seller B', price: 405.00 }], image: 'https://placehold.co/150x150/eeeeee/4B5563/png?text=Ghee' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dairy Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dairyProducts.map((product) => (
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

export default DairyProducts;
