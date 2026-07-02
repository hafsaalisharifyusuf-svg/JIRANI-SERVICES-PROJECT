import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating = 0 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-500 text-sm" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-500 text-sm" />}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-gray-300 text-sm" />
      ))}
    </div>
  );
};

export default RatingStars;