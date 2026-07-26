import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiUser, FiLock, FiLogIn, FiAlertCircle, 
  FiEye, FiEyeOff, FiArrowLeft
} from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md';
import Footer from '../components/Footer';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData({ email: '', password: '' });
  }, []);

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
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-2 transition text-sm"
          >
            <FiArrowLeft />
            Back to Home
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#1a56db] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#1a56db]/20">
                <MdAdminPanelSettings className="text-white text-3xl" />
              </div>
              <h1 className="text-2xl font-bold text-[#0f172a]">Admin Login</h1>
              <p className="text-gray-500 text-sm mt-1">Access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {error && (
                <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                  <FiAlertCircle className="text-red-500 text-lg flex-shrink-0" />
                  {error}
                </div>
              )}

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">Email Address</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="off"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a56db] text-white py-3 rounded-xl hover:bg-[#1e40af] transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#1a56db]/20"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FiLogIn />
                    Login
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>

      {/* ===== REUSE EXISTING FOOTER ===== */}
      <Footer />

    </div>
  );
};

export default AdminLogin;