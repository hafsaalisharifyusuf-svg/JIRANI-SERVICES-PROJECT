import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import WorkerCard from './WorkerCard';

const FeaturedWorkers = () => {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const demoWorkers = [
        {
          id: 1,
          name: 'Ahmed Ali',
          profession: 'Electrician',
          location: 'Garissa',
          price: 1500,
          rating: 4.8,
          reviews: 127,
          skills: ['Wiring', 'Repair', 'Installation'],
          isVerified: true,
          experience: '5 years',
          available: true
        },
        {
          id: 2,
          name: 'Jane Wanjiku',
          profession: 'Plumber',
          location: 'Nairobi',
          price: 1200,
          rating: 4.5,
          reviews: 89,
          skills: ['Pipe Repair', 'Leak Detection'],
          isVerified: true,
          experience: '4 years',
          available: true
        },
        {
          id: 3,
          name: 'John Otieno',
          profession: 'Mechanic',
          location: 'Kisumu',
          price: 2000,
          rating: 4.9,
          reviews: 203,
          skills: ['Engine Repair', 'Brake Service'],
          isVerified: false,
          experience: '7 years',
          available: false
        }
      ];
      setWorkers(demoWorkers);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Loading featured workers...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Featured Workers</h2>
          <p className="text-gray-600 mt-1">Top-rated professionals near you</p>
        </div>
        <button 
          onClick={() => navigate('/workers')}
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          View All
          <FiArrowRight />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map(worker => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedWorkers;