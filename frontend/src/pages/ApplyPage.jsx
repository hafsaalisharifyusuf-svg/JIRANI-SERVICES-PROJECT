import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApplication } from '../services/api';

const ApplyPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    profession: '',
    county: '',
    skills: '',
    experience: '',
    hourly_rate: '',
    bio: ''
  });

  const professions = ['Electrician', 'Plumber', 'Mechanic', 'Tutor', 'Cleaner', 'Tailor', 'Carpenter', 'Painter', 'Driver', 'IT Support'];
  const counties = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Garissa', 'Kisii', 'Meru', 'Nyeri', 'Kitale', 'Kericho', 'Kakamega', 'Bungoma', 'Machakos', 'Embu', 'Isiolo', 'Lamu', 'Voi'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await createApplication({
        full_name: form.full_name,
        phone: form.phone,
        email: form.email,
        profession: form.profession,
        county: form.county,
        skills: form.skills,
        experience: form.experience,
        hourly_rate: parseFloat(form.hourly_rate),
        bio: form.bio
      });

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Submission failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-3xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">Thank you! We'll review your application.</p>
          <button onClick={() => navigate('/')} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Become a Worker</h1>
        <p className="text-center text-gray-600 mb-8">Join Jirani Services and start earning today</p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-red-600 text-sm">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input type="text" name="full_name" value={form.full_name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profession *</label>
              <select name="profession" value={form.profession} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select</option>
                {professions.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">County *</label>
              <select name="county" value={form.county} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select</option>
                {counties.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills * (comma separated)</label>
            <input type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="Wiring, Repair" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience *</label>
              <input type="text" name="experience" value={form.experience} onChange={handleChange} placeholder="5 years" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (KES) *</label>
              <input type="number" name="hourly_rate" value={form.hourly_rate} onChange={handleChange} placeholder="1500" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About You *</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows="3" placeholder="Tell customers about yourself..." required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50">
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyPage;
