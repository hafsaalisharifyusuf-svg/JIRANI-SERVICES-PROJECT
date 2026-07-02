import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSearch, FiMapPin, FiZap, FiDroplet, FiTool, FiBook, 
  FiScissors, FiHome, FiStar, FiClock, FiCheckCircle, 
  FiArrowRight, FiShield, FiThumbsUp, FiAward, FiUsers,
  FiChevronRight, FiCalendar, FiUserCheck,
  FiSmile, FiTruck, FiWifi, FiCamera, FiDollarSign,
  FiTrendingUp, FiBriefcase, FiMessageCircle, FiPhone,
  FiMail, FiGlobe, FiLayers, FiTarget, FiPlay
} from 'react-icons/fi';
import { MdVerified, MdSecurity, MdWorkspacePremium } from 'react-icons/md';
import { FaStar, FaStarHalfAlt, FaWhatsapp, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // ===== CATEGORIES (Urban Company Style) =====
  const categories = [
    { 
      id: 1,
      name: 'Electrician', 
      icon: FiZap, 
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      jobs: '1,200+',
      description: 'Wiring, repair, installation',
      popular: true
    },
    { 
      id: 2,
      name: 'Plumber', 
      icon: FiDroplet, 
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      jobs: '980+',
      description: 'Pipe repair, leak detection',
      popular: true
    },
    { 
      id: 3,
      name: 'Mechanic', 
      icon: FiTool, 
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-600',
      jobs: '760+',
      description: 'Engine repair, brake service',
      popular: false
    },
    { 
      id: 4,
      name: 'Tutor', 
      icon: FiBook, 
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      jobs: '1,450+',
      description: 'Math, English, Science',
      popular: true
    },
    { 
      id: 5,
      name: 'Tailor', 
      icon: FiScissors, 
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      jobs: '530+',
      description: 'Custom clothing, alterations',
      popular: false
    },
    { 
      id: 6,
      name: 'Cleaner', 
      icon: FiHome, 
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      jobs: '1,870+',
      description: 'Home & office cleaning',
      popular: true
    },
    { 
      id: 7,
      name: 'Carpenter', 
      icon: FiTool, 
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      jobs: '420+',
      description: 'Furniture, repairs',
      popular: false
    },
    { 
      id: 8,
      name: 'Painter', 
      icon: FiCamera, 
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      jobs: '380+',
      description: 'Interior & exterior painting',
      popular: false
    },
    { 
      id: 9,
      name: 'Driver', 
      icon: FiTruck, 
      color: 'from-teal-400 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      jobs: '910+',
      description: 'Transport & delivery',
      popular: false
    },
    { 
      id: 10,
      name: 'IT Support', 
      icon: FiWifi, 
      color: 'from-indigo-400 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      jobs: '340+',
      description: 'Computer & network help',
      popular: false
    }
  ];

  // ===== FEATURED WORKERS (TaskRabbit Style) =====
  const featuredWorkers = [
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
      available: true,
      responseTime: '15 min',
      completedJobs: 127,
      image: 'https://ui-avatars.com/api/?name=Ahmed+Ali&size=200&background=3498db&color=fff',
      badge: 'Top Rated'
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
      available: true,
      responseTime: '10 min',
      completedJobs: 89,
      image: 'https://ui-avatars.com/api/?name=Jane+Wanjiku&size=200&background=e67e22&color=fff',
      badge: 'Top Rated'
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
      available: false,
      responseTime: '30 min',
      completedJobs: 203,
      image: 'https://ui-avatars.com/api/?name=John+Otieno&size=200&background=2c3e50&color=fff',
      badge: 'Expert'
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
      available: true,
      responseTime: '5 min',
      completedJobs: 156,
      image: 'https://ui-avatars.com/api/?name=Mary+Akinyi&size=200&background=27ae60&color=fff',
      badge: 'Super Tutor'
    }
  ];

  // ===== WHY CHOOSE US (Urban Company Style) =====
  const whyChooseUs = [
    { 
      icon: MdVerified, 
      title: 'Verified Professionals', 
      description: 'Every worker is background-checked and verified before joining our platform.',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      icon: MdSecurity, 
      title: 'Safe & Secure', 
      description: 'Your safety is our priority. All transactions are protected and insured.',
      color: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      icon: FiThumbsUp, 
      title: 'Quality Guaranteed', 
      description: 'We ensure high-quality service delivery with customer satisfaction guarantee.',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    { 
      icon: FiClock, 
      title: 'Fast Response', 
      description: 'Get connected with workers within minutes of your service request.',
      color: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    { 
      icon: FiDollarSign, 
      title: 'Best Prices', 
      description: 'Transparent pricing with no hidden charges. Compare and choose the best.',
      color: 'bg-pink-50',
      iconColor: 'text-pink-600'
    },
    { 
      icon: FiUsers, 
      title: 'Community Trust', 
      description: 'Join thousands of Kenyans who trust us for their service needs.',
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    }
  ];

  // ===== TESTIMONIALS =====
  const testimonials = [
    {
      name: 'David Ochieng',
      location: 'Nairobi',
      rating: 5,
      comment: 'Found an amazing plumber through Jirani Services. He fixed my pipes in no time! Highly recommended.',
      image: 'https://ui-avatars.com/api/?name=David+Ochieng&size=100&background=3498db&color=fff',
      service: 'Plumber'
    },
    {
      name: 'Sarah Mwangi',
      location: 'Kisumu',
      rating: 5,
      comment: 'I needed a tutor for my daughter. Found a qualified teacher within hours. Her grades have improved significantly!',
      image: 'https://ui-avatars.com/api/?name=Sarah+Mwangi&size=100&background=e67e22&color=fff',
      service: 'Tutor'
    },
    {
      name: 'Michael Kariuki',
      location: 'Mombasa',
      rating: 4,
      comment: 'Quick and reliable service. The electrician arrived on time and did excellent work. Will use again.',
      image: 'https://ui-avatars.com/api/?name=Michael+Kariuki&size=100&background=27ae60&color=fff',
      service: 'Electrician'
    }
  ];

  // ===== STATS (Urban Company Style) =====
  const stats = [
    { number: '500+', label: 'Verified Workers', icon: FiUsers, color: 'text-blue-600' },
    { number: '2,147', label: 'Happy Customers', icon: FiSmile, color: 'text-green-600' },
    { number: '47', label: 'Counties Covered', icon: FiMapPin, color: 'text-purple-600' },
    { number: '98%', label: 'Satisfaction Rate', icon: FiAward, color: 'text-orange-600' }
  ];

  // Auto-rotate testimonials
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
    navigate(`/workers?category=${category}`);
  };

  const handleWorkerClick = (id) => {
    navigate(`/worker/${id}`);
  };

  const handleBookNow = (id) => {
    navigate(`/booking/${id}`);
  };

  return (
    <div className="bg-white">

      {/* ===== 1. HERO SECTION - URBAN COMPANY STYLE ===== */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <MdVerified className="text-green-400" />
              <span className="text-sm font-medium">Trusted by 2,000+ Kenyans</span>
              <span className="w-1 h-1 bg-white/30 rounded-full"></span>
              <span className="flex items-center gap-1 text-sm">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Find Trusted Local Workers <br />
              <span className="text-yellow-400">Near You</span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Connect with verified professionals in your neighborhood. 
              Safe, reliable, and affordable services at your fingertips.
            </p>

            {/* Search Bar - Urban Company Style */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-2 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1 relative">
                  <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition font-semibold flex items-center justify-center gap-2 min-w-[140px] shadow-lg shadow-yellow-400/30"
                >
                  <FiSearch />
                  Search
                </button>
              </div>
            </form>

            {/* Trust Indicators - Urban Company Style */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FiCheckCircle className="text-green-400" />
                <span>500+ Verified Workers</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FiCheckCircle className="text-green-400" />
                <span>47 Counties Covered</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FiCheckCircle className="text-green-400" />
                <span>98% Satisfaction Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. TRUSTED BY SECTION ===== */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm uppercase tracking-wider font-medium mb-4">
            Trusted by leading companies and thousands of Kenyans
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <span className="text-2xl font-bold text-gray-400">Safaricom</span>
            <span className="text-2xl font-bold text-gray-400">KCB</span>
            <span className="text-2xl font-bold text-gray-400">Equity</span>
            <span className="text-2xl font-bold text-gray-400">Jumia</span>
            <span className="text-2xl font-bold text-gray-400">Twiga</span>
          </div>
        </div>
      </section>

      {/* ===== 3. STATS SECTION - URBAN COMPANY STYLE ===== */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center group">
                  <div className={`${stat.color} text-4xl mb-3 flex justify-center group-hover:scale-110 transition`}>
                    <Icon />
                  </div>
                  <div className="text-3xl font-bold text-gray-800">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 4. CATEGORIES - URBAN COMPANY STYLE ===== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Popular Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find trusted professionals across Kenya in these popular categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isHovered = hoveredCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setHoveredCategory(cat.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`${cat.bgColor} rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${
                    isHovered ? 'shadow-xl -translate-y-2' : 'shadow-sm hover:shadow-lg'
                  }`}
                >
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${cat.color} text-white flex items-center justify-center mx-auto mb-3 transition-transform duration-300 ${
                      isHovered ? 'scale-110' : ''
                    }`}>
                      <Icon className="text-2xl" />
                    </div>
                    {cat.popular && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <h3 className={`font-semibold ${cat.textColor}`}>{cat.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{cat.jobs} jobs</p>
                  <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{cat.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/workers')}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Services
              <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ===== 5. FEATURED WORKERS - TASKRABBIT STYLE ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Top Rated Professionals
              </h2>
              <p className="text-gray-600 mt-2">
                Hand-picked experts with the best reviews
              </p>
            </div>
            <button 
              onClick={() => navigate('/workers')}
              className="mt-4 md:mt-0 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 group"
            >
              View All
              <FiArrowRight className="group-hover:translate-x-1 transition" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredWorkers.map((worker) => (
              <div 
                key={worker.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                onClick={() => handleWorkerClick(worker.id)}
              >
                <div className="relative">
                  <img 
                    src={worker.image} 
                    alt={worker.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                  />
                  {worker.badge && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {worker.badge}
                    </div>
                  )}
                  {worker.isVerified && (
                    <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg">
                      <MdVerified className="text-sm" />
                      Verified
                    </div>
                  )}
                  {worker.available ? (
                    <div className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs shadow-lg flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Available Now
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
                      <h3 className="text-lg font-bold text-gray-800">{worker.name}</h3>
                      <p className="text-blue-600 font-medium text-sm">{worker.profession}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <FaStar className="text-yellow-500 text-sm" />
                      <span className="text-sm font-bold">{worker.rating}</span>
                      <span className="text-xs text-gray-500">({worker.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {worker.skills.map((skill, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FiMapPin className="text-gray-400" />
                      {worker.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="text-gray-400" />
                      {worker.responseTime}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-gray-500">Starting from</p>
                      <p className="text-xl font-bold text-blue-600">KES {worker.price}</p>
                      <p className="text-xs text-gray-400">/ hour</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNow(worker.id);
                        }}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-blue-800 transition font-medium text-sm flex items-center gap-1 shadow-lg shadow-blue-600/30"
                      >
                        <FiCheckCircle className="text-sm" />
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. HOW IT WORKS - TASKRABBIT STYLE ===== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              How Jirani Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Book trusted local workers in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StepCard 
              number="01"
              title="Search"
              description="Find workers by skill, location, or browse categories"
              icon={<FiSearch className="text-3xl text-white" />}
              color="bg-blue-600"
              delay="0"
            />
            <StepCard 
              number="02"
              title="Book"
              description="Choose your preferred worker and schedule the service"
              icon={<FiCalendar className="text-3xl text-white" />}
              color="bg-yellow-500"
              delay="200"
            />
            <StepCard 
              number="03"
              title="Get Service"
              description="Worker arrives and completes the job professionally"
              icon={<FiCheckCircle className="text-3xl text-white" />}
              color="bg-green-600"
              delay="400"
            />
          </div>

          {/* Connection Line */}
          <div className="relative max-w-4xl mx-auto mt-8 hidden md:block">
            <div className="absolute top-10 left-0 right-0 h-0.5 bg-gray-300"></div>
            <div className="absolute top-10 left-1/4 w-6 h-6 bg-white border-2 border-blue-600 rounded-full -translate-x-1/2"></div>
            <div className="absolute top-10 left-1/2 w-6 h-6 bg-white border-2 border-yellow-500 rounded-full -translate-x-1/2"></div>
            <div className="absolute top-10 left-3/4 w-6 h-6 bg-white border-2 border-green-600 rounded-full -translate-x-1/2"></div>
          </div>
        </div>
      </section>

      {/* ===== 7. WHY CHOOSE US - URBAN COMPANY STYLE ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Why Choose Jirani Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make finding local workers easy, safe, and reliable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={`${item.color} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                  <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center mb-4`}>
                    <Icon className={`text-3xl ${item.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 8. TESTIMONIALS - URBAN COMPANY STYLE ===== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real reviews from real people across Kenya
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonials[currentTestimonial].image} 
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-sm text-gray-500">{testimonials[currentTestimonial].location}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 text-sm" />
                    ))}
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">
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
                      idx === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. CALL TO ACTION - URBAN COMPANY STYLE ===== */}
      <section className="relative py-20 bg-gradient-to-r from-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ready to Find a Worker?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Kenyans who trust Jirani Services for their local service needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/workers')}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-10 py-4 rounded-2xl hover:from-yellow-500 hover:to-yellow-600 transition font-bold text-lg flex items-center gap-3 shadow-2xl shadow-yellow-500/30"
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
            🚀 Join 2,000+ workers already earning on Jirani Services
          </p>
        </div>
      </section>
    </div>
  );
};

// ===== STEP CARD COMPONENT =====
const StepCard = ({ number, title, description, icon, color, delay }) => (
  <div 
    className="text-center group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="relative inline-block">
      <div className={`w-20 h-20 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition duration-300`}>
        {icon}
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center text-sm font-bold text-gray-700">
        {number}
      </div>
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm max-w-xs mx-auto">{description}</p>
  </div>
);

export default HomePage;