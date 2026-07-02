import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiDollarSign, FiClock, FiCheckCircle } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import RatingStars from './RatingStars';
import SkillTag from './SkillTag';

const WorkerCard = ({ worker }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booking/${worker.id}`);
  };

  const handleViewProfile = () => {
    navigate(`/worker/${worker.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
      <div className="relative">
        <img 
          src={worker.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(worker.name) + '&size=400&background=3498db&color=fff'} 
          alt={worker.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
        />
        {worker.isVerified && (
          <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
            <MdVerified />
            <span>Verified</span>
          </div>
        )}
        {worker.available ? (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs">
            Available Now
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-gray-500 text-white px-2 py-1 rounded-lg text-xs">
            Busy
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-gray-800">{worker.name}</h3>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500 text-sm" />
            <span className="text-sm font-medium">{worker.rating}</span>
            <span className="text-xs text-gray-500">({worker.reviews})</span>
          </div>
        </div>
        <p className="text-blue-600 font-medium text-sm">{worker.profession}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {worker.skills?.slice(0, 3).map((skill, idx) => (
            <SkillTag key={idx} skill={skill} />
          ))}
          {worker.skills?.length > 3 && (
            <span className="text-xs text-gray-500">+{worker.skills.length - 3}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          <div>
            <p className="text-xs text-gray-500">From</p>
            <p className="text-lg font-bold text-blue-600">KES {worker.price}</p>
            <p className="text-xs text-gray-500">/ hour</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleViewProfile}
              className="border border-blue-600 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white transition text-sm"
            >
              Profile
            </button>
            <button
              onClick={handleBookNow}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition text-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;