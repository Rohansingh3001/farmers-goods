import React from 'react';

const ProductCard = ({ imgSrc, title, price }) => {
  return (
    <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow">
      <img className="rounded-t-lg" src={imgSrc} alt={title} />
      <h3 className="mt-2 text-lg font-bold">{title}</h3>
      <p className="text-gray-600">{price}</p>
      <button className="mt-4 w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
