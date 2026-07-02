import React from 'react';
import SearchBar from './SearchBar';
import { FaStar } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';

const HeroSection = ({ onSearch }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">Trusted in Kenya</span>
              <span className="flex items-center gap-1 text-sm">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <span className="ml-1">(2,000+ reviews)</span>
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Find Trusted Local Workers <br />
              <span className="text-yellow-300">Near You</span>
            </h1>
            
            <p className="text-lg text-blue-100 mb-8">
              Connect with verified professionals in your neighborhood. 
              Safe, reliable, and affordable services at your fingertips.
            </p>
            
            <SearchBar onSearch={onSearch} />
            
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <div className="flex items-center gap-1">
                <FiCheckCircle className="text-green-400" />
                <span>500+ Verified Workers</span>
              </div>
              <div className="flex items-center gap-1">
                <FiCheckCircle className="text-green-400" />
                <span>47 Counties Covered</span>
              </div>
              <div className="flex items-center gap-1">
                <FiCheckCircle className="text-green-400" />
                <span>98% Satisfaction Rate</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600" 
              alt="Local workers in Kenya"
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;