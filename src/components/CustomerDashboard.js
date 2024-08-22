// src/components/CustomerDashboard.js
import React from 'react';
import CustomerView from './CustomerView';

const CustomerDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-100">
      <h1 className="text-3xl font-bold">Welcome to the Customer Dashboard</h1>
      {/* Add more customer-specific functionality here */}
    </div>
  );
};

export default CustomerDashboard;
