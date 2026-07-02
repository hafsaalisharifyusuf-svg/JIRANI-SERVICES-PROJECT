import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiMapPin, FiDollarSign, FiClock, FiCheckCircle, 
  FiBriefcase, FiMail, FiPhone, FiArrowLeft,
  FiMessageCircle
} from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import RatingStars from '../components/RatingStars';
import SkillTag from '../components/SkillTag';

const WorkerProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const demoWorker = {
        id: parseInt(id),
        name: 'Ahmed Ali',
        profession: 'Electrician',
        location: 'Garissa',
        price: 1500,
        rating: 4.8,
        reviews: 127,
        skills: ['Wiring', 'Repair', 'Installation', 'Inspection', 'Maintenance'],
        isVerified: true,
        experience: '5 years',
        completedJobs: 127,
        about: 'I am a certified electrician with over 5 years of experience. I specialize in residential and commercial wiring, repair, and installation.',
        available: true,
        reviewsList: [
          { name: 'John Doe', rating: 5, comment: 'Excellent work! Very professional.', date: '2024-01-15' },
          { name: 'Jane Smith', rating: 4, comment: 'Good service, arrived on time.', date: '2024-01-10' }
        ]
      };
      setWorker(demoWorker);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-gray-600">Worker not found</div>
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

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row gap-6 -mt-16">
              <img 
                src={`https://ui-avatars.com/api/?name=${worker.name}&size=128&background=3498db&color=fff`}
                alt={worker.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                      {worker.name}
                      {worker.isVerified && (
                        <span className="text-green-600 text-sm flex items-center gap-1">
                          <MdVerified />
                          Verified
                        </span>
                      )}
                    </h1>
                    <p className="text-blue-600 font-medium">{worker.profession}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">KES {worker.price}</div>
                    <div className="text-sm text-gray-500">per hour</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="flex items-center gap-1 text-gray-600">
                    <FiMapPin />
                    <span>{worker.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <FiClock />
                    <span>{worker.experience}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <FiBriefcase />
                    <span>{worker.completedJobs} jobs completed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <RatingStars rating={worker.rating} />
                    <span className="text-sm text-gray-600">({worker.rating})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <p className="text-gray-600">{worker.about}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map((skill, idx) => (
                  <SkillTag key={idx} skill={skill} />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
              <button 
                onClick={() => navigate(`/booking/${worker.id}`)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
              >
                <FiCheckCircle />
                Book Now
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition font-medium flex items-center justify-center gap-2">
                <FiPhone />
                Contact
              </button>
              <button className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2">
                <FiMessageCircle />
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfilePage;