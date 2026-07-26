import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSearch, FiMapPin, FiStar, FiClock, FiCheckCircle, 
  FiArrowRight, FiShield, FiThumbsUp, FiAward, FiUsers,
  FiZap, FiDroplet, FiTool, FiBook, FiScissors, FiHome,
  FiTruck, FiWifi, FiCamera, FiCalendar,
  FiUserCheck, FiSmile, FiBriefcase, FiGlobe,
  FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import { MdVerified, MdSecurity } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAllWorkers, setShowAllWorkers] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // ===== 20 WORKERS WITH REAL RATINGS =====
  const allWorkers = [
    { id: 1, name: 'Ahmed Hassan', profession: 'Electrician', category: 'Electrician', county: 'Garissa', price: 1500, rating: 4.8, reviews: 127, skills: ['Wiring', 'Repair', 'Installation'], isVerified: true, available: true, responseTime: '15 min', badge: 'Top Rated', image: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&size=200&background=1a56db&color=fff' },
    { id: 2, name: 'Jane Wanjiru', profession: 'Plumber', category: 'Plumber', county: 'Nairobi', price: 1200, rating: 4.7, reviews: 89, skills: ['Pipe Repair', 'Leak Detection'], isVerified: true, available: true, responseTime: '10 min', badge: 'Top Rated', image: 'https://ui-avatars.com/api/?name=Jane+Wanjiru&size=200&background=10b981&color=fff' },
    { id: 3, name: 'John Otieno', profession: 'Mechanic', category: 'Mechanic', county: 'Kisumu', price: 2000, rating: 4.9, reviews: 203, skills: ['Engine Repair', 'Brake Service'], isVerified: true, available: false, responseTime: '30 min', badge: 'Expert', image: 'https://ui-avatars.com/api/?name=John+Otieno&size=200&background=0f172a&color=fff' },
    { id: 4, name: 'Mary Akinyi', profession: 'Tutor', category: 'Tutor', county: 'Mombasa', price: 800, rating: 4.7, reviews: 156, skills: ['Math', 'English', 'Science'], isVerified: true, available: true, responseTime: '5 min', badge: 'Super Tutor', image: 'https://ui-avatars.com/api/?name=Mary+Akinyi&size=200&background=f59e0b&color=fff' },
    { id: 5, name: 'Peter Kamau', profession: 'Cleaner', category: 'Cleaner', county: 'Nakuru', price: 600, rating: 4.6, reviews: 98, skills: ['Home Cleaning', 'Office Cleaning'], isVerified: true, available: true, responseTime: '20 min', badge: 'Fast Responder', image: 'https://ui-avatars.com/api/?name=Peter+Kamau&size=200&background=8b5cf6&color=fff' },
    { id: 6, name: 'Sarah Muthoni', profession: 'Tailor', category: 'Tailor', county: 'Kiambu', price: 1000, rating: 4.9, reviews: 178, skills: ['Custom Clothing', 'Alterations'], isVerified: true, available: true, responseTime: '25 min', badge: 'Top Rated', image: 'https://ui-avatars.com/api/?name=Sarah+Muthoni&size=200&background=ec4899&color=fff' },
    { id: 7, name: 'David Ochieng', profession: 'Carpenter', category: 'Carpenter', county: 'Kisii', price: 1800, rating: 4.7, reviews: 134, skills: ['Furniture Making', 'Repairs'], isVerified: true, available: true, responseTime: '45 min', badge: 'Expert', image: 'https://ui-avatars.com/api/?name=David+Ochieng&size=200&background=f97316&color=fff' },
    { id: 8, name: 'Grace Wanjiru', profession: 'Painter', category: 'Painter', county: 'Nyeri', price: 900, rating: 4.5, reviews: 67, skills: ['Interior Painting', 'Exterior Painting'], isVerified: true, available: true, responseTime: '30 min', badge: 'Top Rated', image: 'https://ui-avatars.com/api/?name=Grace+Wanjiru&size=200&background=14b8a6&color=fff' },
    { id: 9, name: 'Michael Kariuki', profession: 'Driver', category: 'Driver', county: 'Eldoret', price: 2500, rating: 4.8, reviews: 145, skills: ['Transport', 'Delivery'], isVerified: true, available: true, responseTime: '15 min', badge: 'Top Rated', image: 'https://ui-avatars.com/api/?name=Michael+Kariuki&size=200&background=1a56db&color=fff' },
    { id: 10, name: 'Esther Njoki', profession: 'IT Support', category: 'IT Support', county: 'Thika', price: 1500, rating: 4.9, reviews: 189, skills: ['Computer Repair', 'Network Setup'], isVerified: true, available: true, responseTime: '10 min', badge: 'Expert', image: 'https://ui-avatars.com/api/?name=Esther+Njoki&size=200&background=10b981&color=fff' },
    { id: 11, name: 'Hassan Omar', profession: 'Electrician', category: 'Electrician', county: 'Malindi', price: 1400, rating: 4.6, reviews: 112, skills: ['Wiring', 'Solar Installation'], isVerified: true, available: true, responseTime: '20 min', badge: 'Top Rated', image: 'https://ui-avatars.com/api/?name=Hassan+Omar&size=200&background=f59e0b&color=fff' },
    { id: 12, name: 'Faith Akoth', profession: 'Plumber', category: 'Plumber', county: 'Homa Bay', price: 1100, rating: 4.4, reviews: 56, skills: ['Pipe Repair', 'Leak Detection'], isVerified: true, available: true, responseTime: '35 min', badge: 'New', image: 'https://ui-avatars.com/api/?name=Faith+Akoth&size=200&background=8b5cf6&color=fff' },
    { id: 13, name: 'James Mwangi', profession: 'Mechanic', category: 'Mechanic', county: 'Kajiado', price: 2200, rating: 4.8, reviews: 167, skills: ['Transmission', 'Brake Service'], isVerified: true, available: false, responseTime: '40 min', badge: 'Expert', image: 'https://ui-avatars.com/api/?name=James+MWangi&size=200&background=0f172a&color=fff' },
    { id: 14, name: 'Martha Nyambura', profession: 'Cleaner', category: 'Cleaner', county: 'Thika', price: 700, rating: 4.7, reviews: 89, skills: ['Deep Cleaning', 'Window Cleaning'], isVerified: true, available: true, responseTime: '15 min', badge: 'Fast Responder', image: 'https://ui-avatars.com/api/?name=Martha+Nyambura&size=200&background=ec4899&color=fff' },
    { id: 15, name: 'Charles Omondi', profession: 'Carpenter', category: 'Carpenter', county: 'Siaya', price: 1600, rating: 4.9, reviews: 156, skills: ['Furniture Design', 'Woodworking'], isVerified: true, available: true, responseTime: '30 min', badge: 'Top Rated', image: 'https://ui-avatars.com/api/?name=Charles+Omondi&size=200&background=f97316&color=fff' },
    { id: 16, name: 'Priscilla Wangui', profession: 'Tutor', category: 'Tutor', county: 'Nairobi', price: 1000, rating: 4.5, reviews: 78, skills: ['English', 'Literature'], isVerified: true, available: true, responseTime: '10 min', badge: 'Super Tutor', image: 'https://ui-avatars.com/api/?name=Priscilla+Wangui&size=200&background=14b8a6&color=fff' },
    { id: 17, name: 'Samuel Kiprop', profession: 'Electrician', category: 'Electrician', county: 'Eldoret', price: 1300, rating: 4.4, reviews: 67, skills: ['Wiring', 'Installation'], isVerified: true, available: true, responseTime: '25 min', badge: 'New', image: 'https://ui-avatars.com/api/?name=Samuel+Kiprop&size=200&background=1a56db&color=fff' },
    { id: 18, name: 'Ruth Kwamboka', profession: 'Tailor', category: 'Tailor', county: 'Kisii', price: 900, rating: 4.6, reviews: 98, skills: ['Custom Clothing', 'Embroidery'], isVerified: true, available: true, responseTime: '20 min', badge: 'Top Rated', image: 'https://ui-avatars.com/api/?name=Ruth+Kwamboka&size=200&background=8b5cf6&color=fff' },
    { id: 19, name: 'Joseph Njoroge', profession: 'Painter', category: 'Painter', county: 'Nakuru', price: 800, rating: 4.3, reviews: 45, skills: ['Interior Painting', 'Exterior Painting'], isVerified: true, available: true, responseTime: '40 min', badge: 'New', image: 'https://ui-avatars.com/api/?name=Joseph+Njoroge&size=200&background=14b8a6&color=fff' },
    { id: 20, name: 'Aisha Mohamed', profession: 'IT Support', category: 'IT Support', county: 'Mombasa', price: 1600, rating: 4.8, reviews: 134, skills: ['Network Security', 'Software Setup'], isVerified: true, available: true, responseTime: '15 min', badge: 'Expert', image: 'https://ui-avatars.com/api/?name=Aisha+Mohamed&size=200&background=10b981&color=fff' }
  ];

  // ===== CATEGORIES =====
  const categories = [
    { id: 1, name: 'All', icon: FiGlobe },
    { id: 2, name: 'Electrician', icon: FiZap },
    { id: 3, name: 'Plumber', icon: FiDroplet },
    { id: 4, name: 'Mechanic', icon: FiTool },
    { id: 5, name: 'Tutor', icon: FiBook },
    { id: 6, name: 'Cleaner', icon: FiHome },
    { id: 7, name: 'Tailor', icon: FiScissors },
    { id: 8, name: 'Carpenter', icon: FiTool },
    { id: 9, name: 'Painter', icon: FiCamera },
    { id: 10, name: 'Driver', icon: FiTruck },
    { id: 11, name: 'cook', icon: FiWifi }
  ];

  // ===== ALL 47 COUNTIES =====
  const counties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret',
    'Thika', 'Malindi', 'Garissa', 'Kisii', 'Meru',
    'Nyeri', 'Kitale', 'Kericho', 'Kakamega', 'Bungoma',
    'Machakos', 'Embu', 'Isiolo', 'Lamu', 'Voi',
    'Naivasha', 'Kitui', 'Makueni', 'Taita Taveta', 'Kwale',
    'Kilifi', 'Tana River', 'Mandera', 'Wajir', 'Marsabit',
    'Turkana', 'Samburu', 'Trans Nzoia', 'Uasin Gishu', 'Elgeyo Marakwet',
    'Nandi', 'Baringo', 'Laikipia', 'Narok', 'Kajiado',
    'Migori', 'Homa Bay', 'Siaya', 'Busia', 'Vihiga'
  ];

  // ===== TESTIMONIALS =====
  const testimonials = [
    { name: 'David Ochieng', county: 'Nairobi', rating: 5, comment: 'Found an amazing electrician through Jirani Services. He fixed my wiring in no time! Highly recommended.', service: 'Electrician' },
    { name: 'Sarah Mwangi', county: 'Kisumu', rating: 5, comment: 'I needed a tutor for my daughter. Found a qualified teacher within hours. Her grades have improved significantly!', service: 'Tutor' },
    { name: 'Michael Kariuki', county: 'Mombasa', rating: 4, comment: 'Quick and reliable mechanic service. The worker arrived on time and did excellent work on my car.', service: 'Mechanic' },
    { name: 'Grace Wanjiru', county: 'Nakuru', rating: 5, comment: 'The cleaner was professional and thorough. My house has never looked this clean! Will definitely book again.', service: 'Cleaner' }
  ];

  // Filter workers by category
  const filteredWorkers = selectedCategory === 'All' 
    ? allWorkers 
    : allWorkers.filter(w => w.category === selectedCategory);

  const displayedWorkers = showAllWorkers ? filteredWorkers : filteredWorkers.slice(0, 8);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/workers?search=${searchTerm}&location=${location}`);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowAllWorkers(false);
  };

  const handleBookNow = (id) => {
    navigate(`/booking/${id}`);
  };

  const handleViewProfile = (id) => {
    navigate(`/worker/${id}`);
  };

  return (
    <div className="bg-white">

      {/* ===== 1. HERO SECTION - WITH BACKGROUND IMAGE ===== */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1600')`
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/10">
              <MdVerified className="text-[#10b981]" />
              <span className="text-sm font-medium">Kenya's Trusted Service Platform</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Find Trusted Local Workers <br />
              <span className="text-[#f59e0b]">Across Kenya</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Connect with verified professionals in your county. Safe, reliable, and affordable services at your fingertips.
            </p>

            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-2 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                  />
                </div>
                <div className="flex-1 relative">
                  <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your county (e.g., Nairobi)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#f59e0b] text-[#0f172a] px-8 py-4 rounded-xl hover:bg-[#d97706] transition font-bold flex items-center justify-center gap-2 min-w-[140px] shadow-lg shadow-[#f59e0b]/30"
                >
                  <FiSearch />
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <FiCheckCircle className="text-[#10b981]" />
                <span>20 Verified Workers</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <FiCheckCircle className="text-[#10b981]" />
                <span>47 Counties</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <FiCheckCircle className="text-[#10b981]" />
                <span>Start Earning Today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. STATS SECTION ===== */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-[#1a56db] text-4xl mb-2 flex justify-center group-hover:scale-110 transition">
                <FiUsers />
              </div>
              <div className="text-3xl font-bold text-[#0f172a]">20</div>
              <div className="text-gray-500 text-sm">Verified Workers</div>
            </div>
            <div className="text-center group">
              <div className="text-[#1a56db] text-4xl mb-2 flex justify-center group-hover:scale-110 transition">
                <FiMapPin />
              </div>
              <div className="text-3xl font-bold text-[#0f172a]">47</div>
              <div className="text-gray-500 text-sm">Counties Covered</div>
            </div>
            <div className="text-center group">
              <div className="text-[#1a56db] text-4xl mb-2 flex justify-center group-hover:scale-110 transition">
                <FiAward />
              </div>
              <div className="text-3xl font-bold text-[#0f172a]">98%</div>
              <div className="text-gray-500 text-sm">Satisfaction Rate</div>
            </div>
            <div className="text-center group">
              <div className="text-[#1a56db] text-4xl mb-2 flex justify-center group-hover:scale-110 transition">
                <FiUserCheck />
              </div>
              <div className="text-3xl font-bold text-[#0f172a]">Get</div>
              <div className="text-gray-500 text-sm">Started Today</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. ABOUT SECTION ===== */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <span className="text-[#1a56db] font-medium text-sm uppercase tracking-wider">About Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mt-2 mb-4">
                Connecting Kenya, <br />
                <span className="text-[#1a56db]">One Worker at a Time</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Jirani Services is Kenya's newest platform connecting customers with trusted local workers across all 47 counties. We believe in the power of community and making professional services accessible to everyone.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Whether you need an electrician in Garissa, a plumber in Nairobi, or a tutor in Mombasa, we've got you covered. All our workers are verified and ready to serve you with quality, reliability, and professionalism.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <MdVerified className="text-[#10b981] text-xl" />
                  <span className="text-sm text-gray-700">20 Verified Workers</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-[#1a56db] text-xl" />
                  <span className="text-sm text-gray-700">47 Counties Covered</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiShield className="text-[#1a56db] text-xl" />
                  <span className="text-sm text-gray-700">Safe & Reliable</span>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600" 
                alt="Kenyan workers" 
                className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. CATEGORIES ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-3">
              Popular Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find trusted professionals across 47 counties in these popular categories
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#1a56db] text-white shadow-lg shadow-[#1a56db]/30' 
                      : 'bg-[#f8fafc] text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  <Icon className={isActive ? 'text-white' : 'text-[#1a56db]'} />
                  <span className="font-medium">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 5. WORKERS ===== */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#0f172a]">
                {selectedCategory === 'All' ? 'Top Rated Workers' : selectedCategory}
              </h2>
              <p className="text-gray-600">{filteredWorkers.length} workers available</p>
            </div>
            {filteredWorkers.length > 8 && (
              <button 
                onClick={() => setShowAllWorkers(!showAllWorkers)}
                className="text-[#1a56db] font-medium flex items-center gap-2"
              >
                {showAllWorkers ? 'Show Less' : `View All ${filteredWorkers.length}`}
                {showAllWorkers ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedWorkers.map((worker) => (
              <div 
                key={worker.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border border-gray-100 hover:border-[#1a56db]/20"
                onClick={() => handleViewProfile(worker.id)}
              >
                <div className="relative">
                  <img src={worker.image} alt={worker.name} className="w-full h-56 object-cover group-hover:scale-105 transition duration-300" />
                  {worker.badge && (
                    <div className="absolute top-3 left-3 bg-[#f59e0b] text-[#0f172a] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {worker.badge}
                    </div>
                  )}
                  {worker.isVerified && (
                    <div className="absolute top-3 right-3 bg-[#10b981] text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg">
                      <MdVerified className="text-sm" />
                      Verified
                    </div>
                  )}
                  {worker.available ? (
                    <div className="absolute bottom-3 left-3 bg-[#10b981] text-white px-3 py-1 rounded-full text-xs shadow-lg flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Available
                    </div>
                  ) : (
                    <div className="absolute bottom-3 left-3 bg-gray-500 text-white px-3 py-1 rounded-full text-xs shadow-lg">
                      Busy
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-[#0f172a]">{worker.name}</h3>
                      <p className="text-[#1a56db] font-medium text-sm">{worker.profession}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#fef3c7] px-2 py-1 rounded-lg">
                      <FaStar className="text-[#f59e0b] text-sm" />
                      <span className="text-sm font-bold">{worker.rating}</span>
                      <span className="text-xs text-gray-500">({worker.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {worker.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FiMapPin className="text-gray-400" />
                      {worker.county}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="text-gray-400" />
                      {worker.responseTime}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">From</p>
                      <p className="text-xl font-bold text-[#1a56db]">KES {worker.price}</p>
                      <p className="text-xs text-gray-400">/ hour</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNow(worker.id);
                      }}
                      className="bg-[#1a56db] text-white px-4 py-2 rounded-xl hover:bg-[#1e40af] transition font-medium text-sm shadow-lg shadow-[#1a56db]/30"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. HOW IT WORKS ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-3">How Jirani Works</h2>
            <p className="text-gray-600">Book trusted local workers in 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-[#1a56db] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition duration-300 shadow-[#1a56db]/30">
                  <FiSearch className="text-3xl text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center text-sm font-bold text-[#0f172a]">01</div>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-2">Search</h3>
              <p className="text-gray-600 text-sm">Find workers by skill, county, or browse categories</p>
            </div>

            <div className="text-center group">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-[#f59e0b] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition duration-300 shadow-[#f59e0b]/30">
                  <FiCalendar className="text-3xl text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center text-sm font-bold text-[#0f172a]">02</div>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-2">Book</h3>
              <p className="text-gray-600 text-sm">Choose your preferred worker and schedule the service</p>
            </div>

            <div className="text-center group">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-[#10b981] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition duration-300 shadow-[#10b981]/30">
                  <FiCheckCircle className="text-3xl text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center text-sm font-bold text-[#0f172a]">03</div>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-2">Get Service</h3>
              <p className="text-gray-600 text-sm">Worker arrives and completes the job professionally</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. KENYA MAP SECTION ===== */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-3">
              We Cover All 47 Counties
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From Nairobi to Mombasa, Kisumu to Garissa - we're everywhere
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-md p-6 overflow-hidden border border-gray-100">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Kenya_map_with_counties.png/800px-Kenya_map_with_counties.png"
                    alt="Kenya Counties Map"
                    className="w-full rounded-xl shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-[#1a56db]/5 p-6 rounded-xl border border-[#1a56db]/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#1a56db] rounded-full flex items-center justify-center">
                        <FiMapPin className="text-white text-2xl" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#1a56db]">47</p>
                        <p className="text-sm text-gray-600">Counties Covered</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Jirani Services connects you with trusted workers in all 47 counties across Kenya. 
                      No matter where you are, we've got you covered.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {counties.slice(0, 15).map((county, idx) => (
                        <span key={idx} className="bg-[#1a56db]/10 text-[#1a56db] text-xs px-2 py-1 rounded-full">
                          {county}
                        </span>
                      ))}
                      <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                        +32 more
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8. TESTIMONIALS ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-3">What Our Customers Say</h2>
            <p className="text-gray-600">Real reviews from real people across Kenya</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-[#f8fafc] rounded-2xl p-8 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={`https://ui-avatars.com/api/?name=${testimonials[currentTestimonial].name}&size=100&background=1a56db&color=fff`}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#1a56db]"
                />
                <div>
                  <h4 className="font-bold text-[#0f172a]">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-sm text-gray-500">{testimonials[currentTestimonial].county}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <FaStar key={i} className="text-[#f59e0b] text-sm" />
                    ))}
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="bg-[#1a56db]/10 text-[#1a56db] text-xs px-3 py-1 rounded-full">
                    {testimonials[currentTestimonial].service}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed italic">
                "{testimonials[currentTestimonial].comment}"
              </p>
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentTestimonial ? 'bg-[#1a56db] w-8' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. WHY CHOOSE US ===== */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Why Choose Jirani</h2>
            <p className="text-gray-600">We make finding local workers easy and reliable</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition text-center border border-gray-100">
              <MdVerified className="text-[#1a56db] text-4xl mx-auto mb-3" />
              <h3 className="font-bold text-[#0f172a]">Verified Workers</h3>
              <p className="text-gray-600 text-sm">All workers are vetted and verified</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition text-center border border-gray-100">
              <MdSecurity className="text-[#10b981] text-4xl mx-auto mb-3" />
              <h3 className="font-bold text-[#0f172a]">Safe & Secure</h3>
              <p className="text-gray-600 text-sm">Your safety is our priority</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition text-center border border-gray-100">
              <FiThumbsUp className="text-[#f59e0b] text-4xl mx-auto mb-3" />
              <h3 className="font-bold text-[#0f172a]">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm">High-quality service every time</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition text-center border border-gray-100">
              <FiClock className="text-[#8b5cf6] text-4xl mx-auto mb-3" />
              <h3 className="font-bold text-[#0f172a]">Fast Response</h3>
              <p className="text-gray-600 text-sm">Get connected within minutes</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition text-center border border-gray-100">
              <FiAward className="text-[#f59e0b] text-4xl mx-auto mb-3" />
              <h3 className="font-bold text-[#0f172a]">Best Prices</h3>
              <p className="text-gray-600 text-sm">Transparent pricing, no hidden fees</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition text-center border border-gray-100">
              <FiUsers className="text-[#1a56db] text-4xl mx-auto mb-3" />
              <h3 className="font-bold text-[#0f172a]">Community Trust</h3>
              <p className="text-gray-600 text-sm">Trusted by Kenyans across the country</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 10. CALL TO ACTION ===== */}
      <section className="relative py-20 bg-[#1a56db] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ready to Find a Worker?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join Jirani Services today and connect with trusted local professionals across Kenya.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/workers')}
              className="bg-[#f59e0b] text-[#0f172a] px-10 py-4 rounded-2xl hover:bg-[#d97706] transition font-bold text-lg flex items-center gap-3 shadow-2xl shadow-[#f59e0b]/30"
            >
              <FiSearch />
              Find a Worker
            </button>
            <button
              onClick={() => navigate('/apply')}
              className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-2xl hover:bg-white/20 transition font-bold text-lg flex items-center gap-3 border border-white/20"
            >
              <FiUserCheck />
              Become a Worker
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-6">
            🚀 20 verified workers • 47 counties • Trusted platform in Kenya
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;