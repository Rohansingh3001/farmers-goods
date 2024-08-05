import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="mb-4 text-3xl font-bold text-center text-gray-900">Contact Us</h1>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <form className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="name">Full Name</label>
            <input type="text" id="name" className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input type="email" id="email" className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="example@example.com" required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="message">Message</label>
            <textarea id="message" className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Your message here..." rows="4" required></textarea>
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
