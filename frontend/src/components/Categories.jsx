import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiZap, FiDroplet, FiTool, FiBook, 
  FiScissors, FiHome, FiTruck, FiWifi, 
  FiCamera, FiChevronRight 
} from 'react-icons/fi';

const Categories = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const categories = [
    { name: 'Electrician', icon: FiZap, color: 'bg-yellow-100', textColor: 'text-yellow-700', jobs: 124 },
    { name: 'Plumber', icon: FiDroplet, color: 'bg-blue-100', textColor: 'text-blue-700', jobs: 98 },
    { name: 'Mechanic', icon: FiTool, color: 'bg-gray-100', textColor: 'text-gray-700', jobs: 76 },
    { name: 'Tutor', icon: FiBook, color: 'bg-green-100', textColor: 'text-green-700', jobs: 145 },
    { name: 'Tailor', icon: FiScissors, color: 'bg-purple-100', textColor: 'text-purple-700', jobs: 53 },
    { name: 'Cleaner', icon: FiHome, color: 'bg-red-100', textColor: 'text-red-700', jobs: 187 },
    { name: 'Carpenter', icon: FiTool, color: 'bg-orange-100', textColor: 'text-orange-700', jobs: 42 },
    { name: 'Painter', icon: FiCamera, color: 'bg-pink-100', textColor: 'text-pink-700', jobs: 38 },
    { name: 'Driver', icon: FiTruck, color: 'bg-teal-100', textColor: 'text-teal-700', jobs: 91 },
    { name: 'IT Support', icon: FiWifi, color: 'bg-indigo-100', textColor: 'text-indigo-700', jobs: 34 }
  ];

  const visibleCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Popular Services</h2>
        <p className="text-gray-600">Find professionals in these categories</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {visibleCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div 
              key={idx}
              onClick={() => navigate(`/workers?category=${cat.name}`)}
              className={`${cat.color} p-6 rounded-xl text-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
            >
              <Icon className={`text-4xl mx-auto mb-3 ${cat.textColor} group-hover:scale-110 transition`} />
              <h3 className={`font-semibold ${cat.textColor}`}>{cat.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{cat.jobs} jobs</p>
            </div>
          );
        })}
      </div>
      
      {categories.length > 6 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1 mx-auto"
          >
            {showAll ? 'Show Less' : 'View All Categories'}
            <FiChevronRight className={`transition ${showAll ? 'rotate-90' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Categories;