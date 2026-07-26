import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiMapPin, FiCalendar, FiClock, FiFileText, FiDollarSign, 
  FiSend, FiCheckCircle, FiAlertCircle, FiUser, FiPhone,
  FiArrowLeft, FiBriefcase
} from 'react-icons/fi';
import API_URL from '../services/api';

const RequestWorkerPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    date_needed: '',
    time_needed: '',
    budget: '',
    contact_phone: '',
    contact_email: ''
  });
  const [errors, setErrors] = useState({});

  const categories = [
    'Electrician', 'Plumber', 'Mechanic', 'Tutor', 'Tailor', 
    'Cleaner', 'Carpenter', 'Painter', 'Driver', 'IT Support'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.contact_phone.trim()) newErrors.contact_phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to post request');
      }
    } catch (err) {
      setError('Network error. Please check if backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#f8fafc] min-h-screen flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="text-[#10b981] text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Request Posted! 🎉</h2>
          <p className="text-[#6b7280] mb-6">Your job request has been published. Workers will contact you soon.</p>
          <button onClick={() => navigate('/')} className="w-full bg-[#1a56db] text-white py-3 rounded-xl hover:bg-[#1e40af] transition font-semibold">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#6b7280] hover:text-[#1a56db] transition mb-6">
          <FiArrowLeft /> Back
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Request a Worker</h1>
          <p className="text-[#6b7280]">Tell us what you need and local workers will respond</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-[#e5e7eb]">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1">Job Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Need Electrician for House Wiring" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]" />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1">Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]">
                <option value="">Select category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1">Description *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Describe the work needed in detail..." className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db] resize-none" />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1">Location *</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Nairobi, Westlands" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]" />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1">Date Needed</label>
                <input type="date" name="date_needed" value={formData.date_needed} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1">Time Needed</label>
                <input type="time" name="time_needed" value={formData.time_needed} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1">Budget (KES)</label>
              <input type="number" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g., 5000" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]" />
              <p className="text-xs text-[#6b7280] mt-1">Leave blank if negotiable</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#0f172a] mb-4">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0f172a] mb-1">Phone *</label>
                  <input type="tel" name="contact_phone" value={formData.contact_phone} onChange={handleChange} placeholder="0712 345678" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]" />
                  {errors.contact_phone && <p className="text-red-500 text-xs mt-1">{errors.contact_phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0f172a] mb-1">Email</label>
                  <input type="email" name="contact_email" value={formData.contact_email} onChange={handleChange} placeholder="your@email.com" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]" />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <FiAlertCircle className="text-blue-600 text-xl flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  <strong>How it works:</strong> After posting your request, interested workers will contact you via phone.
                </p>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#1a56db] text-white py-3 rounded-xl hover:bg-[#1e40af] transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
              {isSubmitting ? 'Submitting...' : <><FiSend /> Post Request</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestWorkerPage;
