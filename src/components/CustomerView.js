import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CustomerView = ({ addToCart }) => (
  <>
    <h1 className="text-3xl font-bold mt-6 text-center">Farmers Goods Marketplace</h1>
    <p className="text-lg text-center">Fresh produce delivered to your doorstep</p>

    <section className="w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow mt-6">
      <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay interval={3000}>
        <div>
          <img src="https://placehold.co/800x400/eeeeee/4B5563/png?text=Fresh+Vegetables" alt="Fresh Vegetables" />
        </div>
        <div>
          <img src="https://placehold.co/800x400/eeeeee/4B5563/png?text=Organic+Fruits" alt="Organic Fruits" />
        </div>
        <div>
          <img src="https://placehold.co/800x400/eeeeee/4B5563/png?text=Dairy+Products" alt="Dairy Products" />
        </div>
      </Carousel>
    </section>

    <section className="w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow">
          <img className="rounded-t-lg w-full" src="https://placehold.co/300x200/eeeeee/4B5563/png?text=Vegetables" alt="Vegetables" />
          <h3 className="mt-2 text-lg font-bold text-center">Fresh Vegetables</h3>
          <p className="text-gray-600 text-center">₹185.00 per kg</p>
          <button className="mt-4 w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2" onClick={() => addToCart({ id: 1, name: 'Fresh Vegetables', price: 185 })}>Add to Cart</button>
        </div>
        <div className="max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow">
          <img className="rounded-t-lg w-full" src="https://placehold.co/300x200/eeeeee/4B5563/png?text=Fruits" alt="Fruits" />
          <h3 className="mt-2 text-lg font-bold text-center">Organic Fruits</h3>
          <p className="text-gray-600 text-center">₹225.00 per kg</p>
          <button className="mt-4 w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2" onClick={() => addToCart({ id: 2, name: 'Organic Fruits', price: 225 })}>Add to Cart</button>
        </div>
        <div className="max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow">
          <img className="rounded-t-lg w-full" src="https://placehold.co/300x200/eeeeee/4B5563/png?text=Dairy" alt="Dairy Products" />
          <h3 className="mt-2 text-lg font-bold text-center">Dairy Products</h3>
          <p className="text-gray-600 text-center">₹112.50 per liter</p>
          <button className="mt-4 w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2" onClick={() => addToCart({ id: 3, name: 'Dairy Products', price: 112.5 })}>Add to Cart</button>
        </div>
      </div>
    </section>

    <section className="w-full max-w-4xl p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Why Choose Us?</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Locally sourced products</li>
        <li>Fresh and organic</li>
        <li>Support local farmers</li>
        <li>Convenient delivery options</li>
      </ul>
    </section>
  </>
);

export default CustomerView;
