import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { FiArrowLeft } from 'react-icons/fi';

const BookingPage = () => {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const demoWorker = {
        id: parseInt(workerId),
        name: 'Ahmed Ali',
        profession: 'Electrician',
        location: 'Garissa',
        price: 1500,
        rating: 4.8
      };
      setWorker(demoWorker);
      setLoading(false);
    }, 500);
  }, [workerId]);

  const handleBookingSubmit = (formData) => {
    console.log('Booking data:', formData);
    alert('Booking submitted successfully!');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <FiArrowLeft />
        Back
      </button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Book Service</h1>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <BookingForm 
            workerId={workerId} 
            workerName={worker?.name}
            onSubmit={handleBookingSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;