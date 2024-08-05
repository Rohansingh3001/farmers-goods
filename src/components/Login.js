import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <input type="password" placeholder="Password" className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">Login</button>
        </form>
        <div className="flex flex-col space-y-4">
          <button type="button" className="flex items-center justify-center w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-300">
            <svg className="w-5 h-5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 0 0 0 16 8 8 0 0 0 0-16zm1.5 12.5h-3v-1h3v1zm0-2.5h-3v-1h3v1zm0-2.5h-3v-1h3v1z"></path>
            </svg>
            Login with Google
          </button>
          <div className="flex justify-between">
            <button className="text-blue-600 hover:underline px-4 py-2 bg-gray-200 rounded-lg">Login as Farmer</button>
            
          </div>
        </div>
        <p className="text-center text-gray-600">Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
