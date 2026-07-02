import React from "react";

const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h1>
        <p className="text-center text-gray-600 mb-4">Admin login page is loading...</p>
        <button 
          onClick={() => window.location.href = "/"}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
