import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';
import WorkerCard from '../components/WorkerCard';
import SearchBar from '../components/SearchBar';

const WorkersPage = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
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
        },
        {
          id: 4,
          name: 'Mary Akinyi',
          profession: 'Tutor',
          location: 'Mombasa',
          price: 800,
          rating: 4.7,
          reviews: 156,
          skills: ['Math', 'English', 'Science'],
          isVerified: true,
          experience: '3 years',
          available: true
        }
      ];
      
      let filtered = demoWorkers;
      if (category) {
        filtered = demoWorkers.filter(w => w.profession === category);
      }
      
      setWorkers(filtered);
      setLoading(false);
    }, 1000);
  }, [location.search]);

  const handleSearch = ({ searchTerm, location }) => {
    console.log('Searching:', searchTerm, location);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Loading workers...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Find Local Workers</h1>
          <p className="text-gray-600 text-sm">{workers.length} professionals available</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            <FiGrid />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            <FiList />
          </button>
        </div>
      </div>
      
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
        {workers.map(worker => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
      </div>

      {workers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No workers found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default WorkersPage;