import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiMapPin, FiClock, FiCheckCircle, FiArrowLeft, 
  FiBriefcase, FiShare2, FiUser
} from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
import SkillTag from '../components/SkillTag';

const WorkerProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== 20 WORKERS WITH NO FAKE DATA =====
  const allWorkers = [
    { id: 1, name: 'Ahmed Hassan', profession: 'Electrician', category: 'Electrician', county: 'Garissa', price: 1500, skills: ['Wiring', 'Repair', 'Installation', 'Inspection'], isVerified: true, available: true, responseTime: '15 min', badge: 'New', experience: '5 years', since: '2024', about: 'I am a certified electrician with over 5 years of experience. I specialize in residential and commercial wiring, repair, and installation. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English', 'Somali'], image: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&size=300&background=1a56db&color=fff' },
    { id: 2, name: 'Jane Wanjiru', profession: 'Plumber', category: 'Plumber', county: 'Nairobi', price: 1200, skills: ['Pipe Repair', 'Leak Detection', 'Installation'], isVerified: true, available: true, responseTime: '10 min', badge: 'New', experience: '4 years', since: '2024', about: 'I am a certified plumber with 4 years of experience. I specialize in pipe repair, leak detection, and installation. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English'], image: 'https://ui-avatars.com/api/?name=Jane+Wanjiru&size=300&background=10b981&color=fff' },
    { id: 3, name: 'John Otieno', profession: 'Mechanic', category: 'Mechanic', county: 'Kisumu', price: 2000, skills: ['Engine Repair', 'Brake Service', 'Diagnostics'], isVerified: true, available: true, responseTime: '30 min', badge: 'New', experience: '7 years', since: '2024', about: 'I am a certified mechanic with 7 years of experience. I specialize in engine repair, brake service, and diagnostics. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English', 'Luo'], image: 'https://ui-avatars.com/api/?name=John+Otieno&size=300&background=0f172a&color=fff' },
    { id: 4, name: 'Mary Akinyi', profession: 'Tutor', category: 'Tutor', county: 'Mombasa', price: 800, skills: ['Mathematics', 'English', 'Science'], isVerified: true, available: true, responseTime: '5 min', badge: 'New', experience: '3 years', since: '2024', about: 'I am a certified tutor with 3 years of experience. I specialize in Mathematics, English, and Science. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English'], image: 'https://ui-avatars.com/api/?name=Mary+Akinyi&size=300&background=f59e0b&color=fff' },
    { id: 5, name: 'Peter Kamau', profession: 'Cleaner', category: 'Cleaner', county: 'Nakuru', price: 600, skills: ['Home Cleaning', 'Office Cleaning', 'Carpet Cleaning'], isVerified: true, available: true, responseTime: '20 min', badge: 'New', experience: '3 years', since: '2024', about: 'I am a professional cleaner with 3 years of experience. I specialize in home and office cleaning. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English'], image: 'https://ui-avatars.com/api/?name=Peter+Kamau&size=300&background=8b5cf6&color=fff' },
    { id: 6, name: 'Sarah Muthoni', profession: 'Tailor', category: 'Tailor', county: 'Kiambu', price: 1000, skills: ['Custom Clothing', 'Alterations', 'Bridal Wear'], isVerified: true, available: true, responseTime: '25 min', badge: 'New', experience: '6 years', since: '2024', about: 'I am a professional tailor with 6 years of experience. I specialize in custom clothing, alterations, and bridal wear. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English', 'Kikuyu'], image: 'https://ui-avatars.com/api/?name=Sarah+Muthoni&size=300&background=ec4899&color=fff' },
    { id: 7, name: 'David Ochieng', profession: 'Carpenter', category: 'Carpenter', county: 'Kisii', price: 1800, skills: ['Furniture Making', 'Repairs', 'Cabinet Installation'], isVerified: true, available: true, responseTime: '45 min', badge: 'New', experience: '8 years', since: '2024', about: 'I am a professional carpenter with 8 years of experience. I specialize in furniture making, repairs, and cabinet installation. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English', 'Luo'], image: 'https://ui-avatars.com/api/?name=David+Ochieng&size=300&background=f97316&color=fff' },
    { id: 8, name: 'Grace Wanjiru', profession: 'Painter', category: 'Painter', county: 'Nyeri', price: 900, skills: ['Interior Painting', 'Exterior Painting', 'Wallpaper'], isVerified: true, available: true, responseTime: '30 min', badge: 'New', experience: '2 years', since: '2024', about: 'I am a professional painter with 2 years of experience. I specialize in interior and exterior painting. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English', 'Kikuyu'], image: 'https://ui-avatars.com/api/?name=Grace+Wanjiru&size=300&background=14b8a6&color=fff' },
    { id: 9, name: 'Michael Kariuki', profession: 'Driver', category: 'Driver', county: 'Eldoret', price: 2500, skills: ['Transport', 'Delivery', 'Logistics'], isVerified: true, available: true, responseTime: '15 min', badge: 'New', experience: '10 years', since: '2024', about: 'I am a professional driver with 10 years of experience. I specialize in transport, delivery, and logistics. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English'], image: 'https://ui-avatars.com/api/?name=Michael+Kariuki&size=300&background=1a56db&color=fff' },
    { id: 10, name: 'Esther Njoki', profession: 'IT Support', category: 'IT Support', county: 'Thika', price: 1500, skills: ['Computer Repair', 'Network Setup', 'Software Installation'], isVerified: true, available: true, responseTime: '10 min', badge: 'New', experience: '5 years', since: '2024', about: 'I am an IT professional with 5 years of experience. I specialize in computer repair, network setup, and software installation. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English'], image: 'https://ui-avatars.com/api/?name=Esther+Njoki&size=300&background=10b981&color=fff' },
    { id: 11, name: 'Hassan Omar', profession: 'Electrician', category: 'Electrician', county: 'Malindi', price: 1400, skills: ['Wiring', 'Solar Installation', 'Repair'], isVerified: true, available: true, responseTime: '20 min', badge: 'New', experience: '4 years', since: '2024', about: 'I am a certified electrician with 4 years of experience. I specialize in wiring and solar installation. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English', 'Somali'], image: 'https://ui-avatars.com/api/?name=Hassan+Omar&size=300&background=f59e0b&color=fff' },
    { id: 12, name: 'Faith Akoth', profession: 'Plumber', category: 'Plumber', county: 'Homa Bay', price: 1100, skills: ['Pipe Repair', 'Leak Detection', 'Installation'], isVerified: true, available: true, responseTime: '35 min', badge: 'New', experience: '2 years', since: '2024', about: 'I am a certified plumber with 2 years of experience. I specialize in pipe repair and leak detection. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English', 'Luo'], image: 'https://ui-avatars.com/api/?name=Faith+Akoth&size=300&background=8b5cf6&color=fff' },
    { id: 13, name: 'James Mwangi', profession: 'Mechanic', category: 'Mechanic', county: 'Kajiado', price: 2200, skills: ['Transmission', 'Brake Service', 'Engine Repair'], isVerified: true, available: true, responseTime: '40 min', badge: 'New', experience: '9 years', since: '2024', about: 'I am a certified mechanic with 9 years of experience. I specialize in transmission and brake service. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English'], image: 'https://ui-avatars.com/api/?name=James+MWangi&size=300&background=0f172a&color=fff' },
    { id: 14, name: 'Martha Nyambura', profession: 'Cleaner', category: 'Cleaner', county: 'Thika', price: 700, skills: ['Deep Cleaning', 'Window Cleaning', 'Office Cleaning'], isVerified: true, available: true, responseTime: '15 min', badge: 'New', experience: '4 years', since: '2024', about: 'I am a professional cleaner with 4 years of experience. I specialize in deep cleaning and window cleaning. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English', 'Kikuyu'], image: 'https://ui-avatars.com/api/?name=Martha+Nyambura&size=300&background=ec4899&color=fff' },
    { id: 15, name: 'Charles Omondi', profession: 'Carpenter', category: 'Carpenter', county: 'Siaya', price: 1600, skills: ['Furniture Design', 'Woodworking', 'Repairs'], isVerified: true, available: true, responseTime: '30 min', badge: 'New', experience: '7 years', since: '2024', about: 'I am a professional carpenter with 7 years of experience. I specialize in furniture design and woodworking. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English', 'Luo'], image: 'https://ui-avatars.com/api/?name=Charles+Omondi&size=300&background=f97316&color=fff' },
    { id: 16, name: 'Priscilla Wangui', profession: 'Tutor', category: 'Tutor', county: 'Nairobi', price: 1000, skills: ['English', 'Literature', 'Creative Writing'], isVerified: true, available: true, responseTime: '10 min', badge: 'New', experience: '3 years', since: '2024', about: 'I am a certified tutor with 3 years of experience. I specialize in English and Literature. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English'], image: 'https://ui-avatars.com/api/?name=Priscilla+Wangui&size=300&background=14b8a6&color=fff' },
    { id: 17, name: 'Samuel Kiprop', profession: 'Electrician', category: 'Electrician', county: 'Eldoret', price: 1300, skills: ['Wiring', 'Installation', 'Repair'], isVerified: true, available: true, responseTime: '25 min', badge: 'New', experience: '3 years', since: '2024', about: 'I am a certified electrician with 3 years of experience. I specialize in wiring and installation. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English', 'Kalenjin'], image: 'https://ui-avatars.com/api/?name=Samuel+Kiprop&size=300&background=1a56db&color=fff' },
    { id: 18, name: 'Ruth Kwamboka', profession: 'Tailor', category: 'Tailor', county: 'Kisii', price: 900, skills: ['Custom Clothing', 'Embroidery', 'Alterations'], isVerified: true, available: true, responseTime: '20 min', badge: 'New', experience: '5 years', since: '2024', about: 'I am a professional tailor with 5 years of experience. I specialize in custom clothing and embroidery. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English', 'Kisii'], image: 'https://ui-avatars.com/api/?name=Ruth+Kwamboka&size=300&background=8b5cf6&color=fff' },
    { id: 19, name: 'Joseph Njoroge', profession: 'Painter', category: 'Painter', county: 'Nakuru', price: 800, skills: ['Interior Painting', 'Exterior Painting'], isVerified: true, available: true, responseTime: '40 min', badge: 'New', experience: '2 years', since: '2024', about: 'I am a professional painter with 2 years of experience. I specialize in interior and exterior painting. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English', 'Kikuyu'], image: 'https://ui-avatars.com/api/?name=Joseph+Njoroge&size=300&background=14b8a6&color=fff' },
    { id: 20, name: 'Aisha Mohamed', profession: 'IT Support', category: 'IT Support', county: 'Mombasa', price: 1600, skills: ['Network Security', 'Software Setup', 'Computer Repair'], isVerified: true, available: true, responseTime: '15 min', badge: 'New', experience: '6 years', since: '2024', about: 'I am an IT professional with 6 years of experience. I specialize in network security and software setup. Ready to serve my first customer on Jirani Services!', languages: ['Swahili', 'English', 'Arabic'], image: 'https://ui-avatars.com/api/?name=Aisha+Mohamed&size=300&background=10b981&color=fff' }
  ];

  // ===== SIMILAR WORKERS =====
  const getSimilarWorkers = (currentWorker) => {
    if (!currentWorker) return [];
    return allWorkers
      .filter(w => w.category === currentWorker.category && w.id !== currentWorker.id)
      .slice(0, 4);
  };

  useEffect(() => {
    setTimeout(() => {
      const workerData = allWorkers.find(w => w.id === parseInt(id));
      setWorker(workerData);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBookNow = () => {
    if (worker) {
      navigate(`/booking/${worker.id}`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${worker?.name} - ${worker?.profession}`,
        text: `Check out ${worker?.name} on Jirani Services!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-[#6b7280]">Loading profile...</div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0f172a]">Worker Not Found</h2>
          <p className="text-[#6b7280] mt-2">The worker you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/workers')}
            className="mt-4 bg-[#1a56db] text-white px-6 py-2 rounded-xl hover:bg-[#1e40af] transition"
          >
            Browse Workers
          </button>
        </div>
      </div>
    );
  }

  const similarWorkers = getSimilarWorkers(worker);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className="container mx-auto px-4 py-8">

        {/* ===== BACK BUTTON ===== */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#6b7280] hover:text-[#1a56db] transition mb-6"
        >
          <FiArrowLeft />
          Back
        </button>

        {/* ===== PROFILE CARD ===== */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-[#e5e7eb]">
          
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-[#1a56db] to-[#1e40af] relative"></div>
          
          {/* Profile Content */}
          <div className="px-6 pb-6">
            
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-6 -mt-16">
              <div className="relative">
                <img 
                  src={worker.image} 
                  alt={worker.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
                {worker.isVerified && (
                  <div className="absolute -bottom-1 right-0 bg-[#10b981] text-white p-1 rounded-full border-2 border-white">
                    <MdVerified className="text-sm" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-start justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-bold text-[#0f172a]">{worker.name}</h1>
                      <span className="bg-[#f59e0b] text-[#0f172a] text-xs font-bold px-3 py-1 rounded-full">
                        New
                      </span>
                      {worker.isVerified && (
                        <span className="bg-[#10b981] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                          <MdVerified className="text-sm" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-[#1a56db] font-medium text-lg">{worker.profession}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#6b7280]">
                      <span className="flex items-center gap-1">
                        <FiMapPin className="text-[#6b7280]" />
                        {worker.county}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock className="text-[#6b7280]" />
                        {worker.experience} experience
                      </span>
                      <span className="flex items-center gap-1">
                        <FiBriefcase className="text-[#6b7280]" />
                        Ready to work
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <div className="bg-gray-100 px-3 py-1 rounded-lg flex items-center gap-1">
                        <FiUser className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-500">New</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-[#1a56db] mt-2">KES {worker.price}</p>
                    <p className="text-xs text-[#6b7280]">per hour</p>
                    {worker.available ? (
                      <span className="inline-block mt-2 bg-[#10b981] text-white text-xs px-3 py-1 rounded-full">
                        Available Now
                      </span>
                    ) : (
                      <span className="inline-block mt-2 bg-[#6b7280] text-white text-xs px-3 py-1 rounded-full">
                        Busy
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ===== ABOUT SECTION ===== */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-[#0f172a] mb-2">About Me</h3>
              <p className="text-[#6b7280] leading-relaxed">{worker.about}</p>
              
              <div className="flex flex-wrap gap-4 mt-3 text-sm">
                <span className="text-[#6b7280]">
                  <span className="font-medium text-[#0f172a]">Experience:</span> {worker.experience}
                </span>
                <span className="text-[#6b7280]">
                  <span className="font-medium text-[#0f172a]">Member since:</span> {worker.since}
                </span>
                <span className="text-[#6b7280]">
                  <span className="font-medium text-[#0f172a]">Languages:</span> {worker.languages.join(', ')}
                </span>
              </div>
            </div>

            {/* ===== SKILLS SECTION ===== */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-[#0f172a] mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map((skill, idx) => (
                  <SkillTag key={idx} skill={skill} />
                ))}
              </div>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[#e5e7eb]">
              <button
                onClick={handleBookNow}
                className="flex-1 bg-[#1a56db] text-white px-6 py-3 rounded-xl hover:bg-[#1e40af] transition font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#1a56db]/30"
              >
                <FiCheckCircle />
                Book Now
              </button>
              <button
                onClick={handleShare}
                className="px-6 py-3 border border-[#e5e7eb] rounded-xl hover:bg-[#f8fafc] transition text-[#6b7280] flex items-center justify-center gap-2"
              >
                <FiShare2 />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* ===== REVIEWS SECTION - EMPTY (NEW PLATFORM) ===== */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6 border border-[#e5e7eb]">
          <h3 className="font-semibold text-lg text-[#0f172a] mb-2">
            Reviews
          </h3>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiUser className="text-gray-400 text-2xl" />
            </div>
            <p className="text-[#6b7280] font-medium">No reviews yet</p>
            <p className="text-[#6b7280] text-sm mt-1">Be the first to book and review this worker!</p>
            <button
              onClick={handleBookNow}
              className="mt-4 bg-[#1a56db] text-white px-6 py-2 rounded-xl hover:bg-[#1e40af] transition text-sm"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* ===== SIMILAR WORKERS ===== */}
        {similarWorkers.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold text-lg text-[#0f172a] mb-4">Similar Workers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarWorkers.map((similar) => (
                <div 
                  key={similar.id}
                  onClick={() => navigate(`/worker/${similar.id}`)}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer p-4 border border-[#e5e7eb] hover:border-[#1a56db]/20"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={similar.image} 
                      alt={similar.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-[#0f172a] text-sm">{similar.name}</p>
                      <p className="text-[#6b7280] text-xs">{similar.profession}</p>
                      <div className="flex items-center gap-1 text-xs text-[#6b7280]">
                        <FiUser className="text-xs" />
                        <span>New</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerProfilePage;