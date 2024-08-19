import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CustomerView = () => {
  const navigate = useNavigate();

  const viewProducts = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mt-6 text-center">Farmers Goods Marketplace</h1>
      <p className="text-lg text-center">Fresh produce delivered to your doorstep</p>

      <section className="w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow mt-6">
        <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay interval={3000}>
          <div>
            <img src="https://thumbs.dreamstime.com/b/vegetables-slate-background-bottom-left-ai-created-content-design-instagram-facebook-wall-painting-backgrounds-art-photo-325039974.jpg" alt="Fresh Vegetables" />
          </div>
          <div>
            <img src="https://images.tridge.com/800x400/seller-story-photo/76/99/46/769946c77d4857f08f2bd4b6b0090328648761f8/blob.jpeg" alt="Organic Fruits" />
          </div>
          <div>
            <img src="https://images.yourstory.com/cs/7/11718bd02d6d11e9aa979329348d4c3e/inflammationdairy-1583320630669-1622802301935.png" alt="Dairy Products" />
          </div>
        </Carousel>
      </section>

      <section className="w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow">
            <img className="rounded-t-lg w-full" src="data:image/jpeg;base64,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" alt="Vegetables" />
            <h3 className="mt-2 text-lg font-bold text-center">Fresh Vegetables</h3>
            <button
              className="mt-4 w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2"
              onClick={() => viewProducts('fresh-vegetables')}
            >
              View Products
            </button>
          </div>
          <div className="max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow">
            <img className="rounded-t-lg w-full" src="https://4.imimg.com/data4/ER/NW/MY-22098906/organic-fruits.jpg" alt="Fruits" />
            <h3 className="mt-2 text-lg font-bold text-center">Organic Fruits</h3>
            <button
              className="mt-4 w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2"
              onClick={() => viewProducts('organic-fruits')}
            >
              View Products
            </button>
          </div>
          <div className="max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow">
            <img className="rounded-t-lg w-full" src="data:image/jpeg;base64,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" alt="Dairy Products" />
            <h3 className="mt-2 text-lg font-bold text-center">Dairy Products</h3>
            <button
              className="mt-4 w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2"
              onClick={() => viewProducts('dairy-products')}
            >
              View Products
            </button>
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
};

export default CustomerView;
