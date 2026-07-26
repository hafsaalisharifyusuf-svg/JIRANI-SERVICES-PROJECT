import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiUser, FiPhone, FiMapPin, FiMail,
  FiCalendar, FiClock, FiFileText, FiCheckCircle,
  FiDollarSign, FiBriefcase
} from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';

const API_URL = 'http://localhost:5000/api';

const BookingPage = () => {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    customer_name: '',
    email: '',
    phone: '',
    location: '',
    date_needed: '',
    time_needed: '',
    description: ''
  });

  // Fetch worker
  useEffect(() => {
    console.log('📡 Fetching worker:', workerId);
    fetch(`${API_URL}/workers/${workerId}`)
      .then(res => res.json())
      .then(data => {
        console.log('📦 Worker data:', data);
        if (data.success) {
          setWorker(data.worker);
        } else {
          setError('Worker not found');
        }
      })
      .catch(err => {
        console.error('❌ Error:', err);
        setError('Failed to load worker');
      })
      .finally(() => setLoading(false));
  }, [workerId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📤 Submit clicked!');
    
    setSubmitting(true);
    setError('');

    const bookingData = {
      worker_id: parseInt(workerId),
      customer_name: form.customer_name,
      email: form.email,
      phone: form.phone,
      location: form.location,
      date_needed: form.date_needed,
      time_needed: form.time_needed,
      description: form.description,
      amount: worker?.price || 0
    };

    console.log('📤 Sending:', bookingData);
    console.log('📤 To URL:', `${API_URL}/bookings`);

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      console.log('📨 Response status:', response.status);
      const data = await response.json();
      console.log('📦 Response data:', data);

      if (data.success) {
        console.log('✅ Booking successful!');
        setSubmitted(true);
      } else {
        console.log('❌ Booking failed:', data.error);
        setError(data.error || 'Booking failed');
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      setError('Network error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-[#1a56db]"></div>
          <p className="mt-4 text-[#6b7280]">Loading...</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-[#e5e7eb]">
          <div className="w-20 h-20 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="text-[#10b981] text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Booking Submitted! 🎉</h2>
          <p className="text-[#6b7280] mb-4">Your booking has been sent to {worker?.name}.</p>
          <div className="bg-[#f8fafc] rounded-xl p-4 text-left mb-6 text-sm">
            <p><span className="font-medium text-[#0f172a]">Worker:</span> {worker?.name}</p>
            <p><span className="font-medium text-[#0f172a]">Email:</span> {form.email || 'Not provided'}</p>
            <p><span className="font-medium text-[#0f172a]">Date:</span> {form.date_needed}</p>
            <p><span className="font-medium text-[#0f172a]">Time:</span> {form.time_needed}</p>
            <p><span className="font-medium text-[#0f172a]">Location:</span> {form.location}</p>
          </div>
          <button onClick={() => navigate('/')} className="w-full bg-[#1a56db] text-white py-3 rounded-xl hover:bg-[#1e40af] transition font-semibold">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#6b7280] hover:text-[#1a56db] transition mb-6">
          <FiArrowLeft /> Back
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#e5e7eb]">
              <h1 className="text-2xl font-bold text-[#0f172a] mb-1">Book Service</h1>
              <p className="text-[#6b7280] text-sm mb-6">Fill in your details to book {worker?.name}</p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-600 text-sm">
                  ❌ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#0f172a] mb-1">
                    <FiUser className="inline mr-1 text-[#6b7280]" /> Full Name *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    value={form.customer_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                    placeholder="e.g., John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f172a] mb-1">
                    <FiMail className="inline mr-1 text-[#6b7280]" /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f172a] mb-1">
                    <FiPhone className="inline mr-1 text-[#6b7280]" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                    placeholder="0712 345678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f172a] mb-1">
                    <FiMapPin className="inline mr-1 text-[#6b7280]" /> Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                    placeholder="Westlands, Nairobi"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0f172a] mb-1">
                      <FiCalendar className="inline mr-1 text-[#6b7280]" /> Date *
                    </label>
                    <input
                      type="date"
                      name="date_needed"
                      value={form.date_needed}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0f172a] mb-1">
                      <FiClock className="inline mr-1 text-[#6b7280]" /> Time *
                    </label>
                    <input
                      type="time"
                      name="time_needed"
                      value={form.time_needed}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f172a] mb-1">
                    <FiFileText className="inline mr-1 text-[#6b7280]" /> Job Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db] resize-none"
                    placeholder="Briefly describe the work you need..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#1a56db] text-white py-3 rounded-xl hover:bg-[#1e40af] transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : '📤 Submit'}
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#e5e7eb] sticky top-8">
              <h3 className="font-semibold text-[#0f172a] mb-4">Booking Summary</h3>
              
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={worker?.image || `https://ui-avatars.com/api/?name=${worker?.name}&size=100&background=1a56db&color=fff`} 
                  alt={worker?.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#1a56db]"
                />
                <div>
                  <p className="font-medium text-[#0f172a]">{worker?.name}</p>
                  <p className="text-sm text-[#6b7280]">{worker?.profession}</p>
                  {worker?.is_verified && (
                    <span className="text-xs text-[#10b981] flex items-center gap-1">
                      <MdVerified className="text-xs" /> Verified
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm text-[#6b7280]">
                <div className="flex justify-between py-1 border-b border-[#e5e7eb]">
                  <span>Location</span>
                  <span className="text-[#0f172a] font-medium">{worker?.county}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#e5e7eb]">
                  <span>Rate</span>
                  <span className="text-[#0f172a] font-medium">KES {worker?.price}/hour</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#e5e7eb]">
                  <span>Response</span>
                  <span className="text-[#0f172a]">{worker?.response_time || '15 min'}</span>
                </div>
              </div>

              <div className="border-t border-[#e5e7eb] mt-4 pt-4">
                <div className="flex justify-between font-semibold text-[#0f172a]">
                  <span>Total</span>
                  <span className="text-[#1a56db]">KES {worker?.price}</span>
                </div>
                <p className="text-xs text-[#6b7280] mt-1">* Based on 1 hour. Final price may vary.</p>
              </div>

              <div className="mt-4 p-3 bg-[#fef3c7] rounded-xl">
                <p className="text-xs text-[#0f172a]">
                  <span className="font-medium">💡 Tip:</span> Provide clear details to help the worker prepare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
