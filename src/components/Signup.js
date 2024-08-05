import React from 'react';

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up for Farmers Market</h2>
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
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input type="password" id="password" className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="********" required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="********" required />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
