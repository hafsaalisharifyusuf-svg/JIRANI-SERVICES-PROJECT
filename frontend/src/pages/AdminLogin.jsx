import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiLogIn, FiShield, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (formData.email === 'admin@jiraniservices.com' && formData.password === 'admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
              <MdAdminPanelSettings className="text-white text-4xl" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Jirani Services</h1>
          <p className="text-gray-600 mt-1">Admin Dashboard Login</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <FiShield className="text-blue-600 text-xl" />
            <h2 className="text-xl font-semibold text-gray-800">Administrator Access</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
                <FiAlertCircle className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-700 text-sm font-medium">Login Failed</p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">
                <FiUser className="inline mr-2" /> Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@jiraniservices.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">
                <FiLock className="inline mr-2" /> Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <FiEyeOff className="text-gray-400 hover:text-gray-600" /> : <FiEye className="text-gray-400 hover:text-gray-600" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30"
            >
              {loading ? 'Logging in...' : (
                <>
                  <FiLogIn />
                  Login to Dashboard
                </>
              )}
            </button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800"><strong>Demo Credentials:</strong></p>
              <div className="mt-1 text-sm text-blue-700 space-y-1">
                <p>📧 Email: <span className="font-mono bg-blue-100 px-2 py-0.5 rounded">admin@jiraniservices.com</span></p>
                <p>🔑 Password: <span className="font-mono bg-blue-100 px-2 py-0.5 rounded">admin123</span></p>
              </div>
            </div>

            <div className="text-center">
              <button type="button" onClick={() => navigate('/')} className="text-gray-500 hover:text-blue-600 text-sm transition">
                ← Back to Home
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
