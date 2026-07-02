import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-3xl font-bold text-blue-600">Jirani Services</h1>
          </Link>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {title && (
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
          )}
          {children}
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            🔒 Secure Access • Jirani Services © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;