import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSearch, FiMapPin, FiClock, FiFilter, FiGrid, FiList, 
  FiChevronDown, FiX, FiBriefcase, FiUser
} from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';

const WorkersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCounty, setSelectedCounty] = useState('All Counties');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // ===== 20 WORKERS - NO FAKE RATINGS OR REVIEWS =====
  const allWorkers = [
    { id: 1, name: 'Ahmed Hassan', profession: 'Electrician', category: 'Electrician', county: 'Garissa', price: 1500, skills: ['Wiring', 'Repair', 'Installation'], isVerified: true, available: true, responseTime: '15 min', badge: 'New', experience: '5 years', image: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&size=200&background=1a56db&color=fff' },
    { id: 2, name: 'Jane Wanjiru', profession: 'Plumber', category: 'Plumber', county: 'Nairobi', price: 1200, skills: ['Pipe Repair', 'Leak Detection'], isVerified: true, available: true, responseTime: '10 min', badge: 'New', experience: '4 years', image: 'https://ui-avatars.com/api/?name=Jane+Wanjiru&size=200&background=10b981&color=fff' },
    { id: 3, name: 'John Otieno', profession: 'Mechanic', category: 'Mechanic', county: 'Kisumu', price: 2000, skills: ['Engine Repair', 'Brake Service'], isVerified: true, available: true, responseTime: '30 min', badge: 'New', experience: '7 years', image: 'https://ui-avatars.com/api/?name=John+Otieno&size=200&background=0f172a&color=fff' },
    { id: 4, name: 'Mary Akinyi', profession: 'Tutor', category: 'Tutor', county: 'Mombasa', price: 800, skills: ['Math', 'English', 'Science'], isVerified: true, available: true, responseTime: '5 min', badge: 'New', experience: '3 years', image: 'https://ui-avatars.com/api/?name=Mary+Akinyi&size=200&background=f59e0b&color=fff' },
    { id: 5, name: 'Peter Kamau', profession: 'Cleaner', category: 'Cleaner', county: 'Nakuru', price: 600, skills: ['Home Cleaning', 'Office Cleaning'], isVerified: true, available: true, responseTime: '20 min', badge: 'New', experience: '3 years', image: 'https://ui-avatars.com/api/?name=Peter+Kamau&size=200&background=8b5cf6&color=fff' },
    { id: 6, name: 'Sarah Muthoni', profession: 'Tailor', category: 'Tailor', county: 'Kiambu', price: 1000, skills: ['Custom Clothing', 'Alterations'], isVerified: true, available: true, responseTime: '25 min', badge: 'New', experience: '6 years', image: 'https://ui-avatars.com/api/?name=Sarah+Muthoni&size=200&background=ec4899&color=fff' },
    { id: 7, name: 'David Ochieng', profession: 'Carpenter', category: 'Carpenter', county: 'Kisii', price: 1800, skills: ['Furniture Making', 'Repairs'], isVerified: true, available: true, responseTime: '45 min', badge: 'New', experience: '8 years', image: 'https://ui-avatars.com/api/?name=David+Ochieng&size=200&background=f97316&color=fff' },
    { id: 8, name: 'Grace Wanjiru', profession: 'Painter', category: 'Painter', county: 'Nyeri', price: 900, skills: ['Interior Painting', 'Exterior Painting'], isVerified: true, available: true, responseTime: '30 min', badge: 'New', experience: '2 years', image: 'https://ui-avatars.com/api/?name=Grace+Wanjiru&size=200&background=14b8a6&color=fff' },
    { id: 9, name: 'Michael Kariuki', profession: 'Driver', category: 'Driver', county: 'Eldoret', price: 2500, skills: ['Transport', 'Delivery'], isVerified: true, available: true, responseTime: '15 min', badge: 'New', experience: '10 years', image: 'https://ui-avatars.com/api/?name=Michael+Kariuki&size=200&background=1a56db&color=fff' },
    { id: 10, name: 'Esther Njoki', profession: 'IT Support', category: 'IT Support', county: 'Thika', price: 1500, skills: ['Computer Repair', 'Network Setup'], isVerified: true, available: true, responseTime: '10 min', badge: 'New', experience: '5 years', image: 'https://ui-avatars.com/api/?name=Esther+Njoki&size=200&background=10b981&color=fff' },
    { id: 11, name: 'Hassan Omar', profession: 'Electrician', category: 'Electrician', county: 'Malindi', price: 1400, skills: ['Wiring', 'Solar Installation'], isVerified: true, available: true, responseTime: '20 min', badge: 'New', experience: '4 years', image: 'https://ui-avatars.com/api/?name=Hassan+Omar&size=200&background=f59e0b&color=fff' },
    { id: 12, name: 'Faith Akoth', profession: 'Plumber', category: 'Plumber', county: 'Homa Bay', price: 1100, skills: ['Pipe Repair', 'Leak Detection'], isVerified: true, available: true, responseTime: '35 min', badge: 'New', experience: '2 years', image: 'https://ui-avatars.com/api/?name=Faith+Akoth&size=200&background=8b5cf6&color=fff' },
    { id: 13, name: 'James Mwangi', profession: 'Mechanic', category: 'Mechanic', county: 'Kajiado', price: 2200, skills: ['Transmission', 'Brake Service'], isVerified: true, available: true, responseTime: '40 min', badge: 'New', experience: '9 years', image: 'https://ui-avatars.com/api/?name=James+MWangi&size=200&background=0f172a&color=fff' },
    { id: 14, name: 'Martha Nyambura', profession: 'Cleaner', category: 'Cleaner', county: 'Thika', price: 700, skills: ['Deep Cleaning', 'Window Cleaning'], isVerified: true, available: true, responseTime: '15 min', badge: 'New', experience: '4 years', image: 'https://ui-avatars.com/api/?name=Martha+Nyambura&size=200&background=ec4899&color=fff' },
    { id: 15, name: 'Charles Omondi', profession: 'Carpenter', category: 'Carpenter', county: 'Siaya', price: 1600, skills: ['Furniture Design', 'Woodworking'], isVerified: true, available: true, responseTime: '30 min', badge: 'New', experience: '7 years', image: 'https://ui-avatars.com/api/?name=Charles+Omondi&size=200&background=f97316&color=fff' },
    { id: 16, name: 'Priscilla Wangui', profession: 'Tutor', category: 'Tutor', county: 'Nairobi', price: 1000, skills: ['English', 'Literature'], isVerified: true, available: true, responseTime: '10 min', badge: 'New', experience: '3 years', image: 'https://ui-avatars.com/api/?name=Priscilla+Wangui&size=200&background=14b8a6&color=fff' },
    { id: 17, name: 'Samuel Kiprop', profession: 'Electrician', category: 'Electrician', county: 'Eldoret', price: 1300, skills: ['Wiring', 'Installation'], isVerified: true, available: true, responseTime: '25 min', badge: 'New', experience: '3 years', image: 'https://ui-avatars.com/api/?name=Samuel+Kiprop&size=200&background=1a56db&color=fff' },
    { id: 18, name: 'Ruth Kwamboka', profession: 'Tailor', category: 'Tailor', county: 'Kisii', price: 900, skills: ['Custom Clothing', 'Embroidery'], isVerified: true, available: true, responseTime: '20 min', badge: 'New', experience: '5 years', image: 'https://ui-avatars.com/api/?name=Ruth+Kwamboka&size=200&background=8b5cf6&color=fff' },
    { id: 19, name: 'Joseph Njoroge', profession: 'Painter', category: 'Painter', county: 'Nakuru', price: 800, skills: ['Interior Painting', 'Exterior Painting'], isVerified: true, available: true, responseTime: '40 min', badge: 'New', experience: '2 years', image: 'https://ui-avatars.com/api/?name=Joseph+Njoroge&size=200&background=14b8a6&color=fff' },
    { id: 20, name: 'Aisha Mohamed', profession: 'IT Support', category: 'IT Support', county: 'Mombasa', price: 1600, skills: ['Network Security', 'Software Setup'], isVerified: true, available: true, responseTime: '15 min', badge: 'New', experience: '6 years', image: 'https://ui-avatars.com/api/?name=Aisha+Mohamed&size=200&background=10b981&color=fff' }
  ];

  // ===== CATEGORIES =====
  const categories = [
    'All Categories', 'Electrician', 'Plumber', 'Mechanic', 'Tutor', 
    'Cleaner', 'Tailor', 'Carpenter', 'Painter', 'Driver', 'IT Support'
  ];

  // ===== COUNTIES =====
  const counties = [
    'All Counties', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret',
    'Thika', 'Malindi', 'Garissa', 'Kisii', 'Meru', 'Nyeri', 'Kitale',
    'Kericho', 'Kakamega', 'Bungoma', 'Machakos', 'Embu', 'Isiolo',
    'Lamu', 'Voi', 'Naivasha', 'Kitui', 'Makueni', 'Taita Taveta',
    'Kwale', 'Kilifi', 'Tana River', 'Mandera', 'Wajir', 'Marsabit',
    'Turkana', 'Samburu', 'Trans Nzoia', 'Uasin Gishu', 'Elgeyo Marakwet',
    'Nandi', 'Baringo', 'Laikipia', 'Narok', 'Kajiado', 'Migori',
    'Homa Bay', 'Siaya', 'Busia', 'Vihiga'
  ];

  // ===== PRICE RANGES =====
  const priceRanges = [
    'All Prices', 'Under KES 500', 'KES 500 - 1000', 'KES 1000 - 2000', 'KES 2000+'
  ];

  // ===== FILTER WORKERS =====
  const getFilteredWorkers = () => {
    let filtered = [...allWorkers];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(w => 
        w.name.toLowerCase().includes(term) ||
        w.profession.toLowerCase().includes(term) ||
        w.skills.some(s => s.toLowerCase().includes(term)) ||
        w.county.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(w => w.category === selectedCategory);
    }

    if (selectedCounty !== 'All Counties') {
      filtered = filtered.filter(w => w.county === selectedCounty);
    }

    if (selectedPrice !== 'All Prices') {
      if (selectedPrice === 'Under KES 500') {
        filtered = filtered.filter(w => w.price < 500);
      } else if (selectedPrice === 'KES 500 - 1000') {
        filtered = filtered.filter(w => w.price >= 500 && w.price <= 1000);
      } else if (selectedPrice === 'KES 1000 - 2000') {
        filtered = filtered.filter(w => w.price >= 1000 && w.price <= 2000);
      } else if (selectedPrice === 'KES 2000+') {
        filtered = filtered.filter(w => w.price > 2000);
      }
    }

    return filtered;
  };

  const filteredWorkers = getFilteredWorkers();

  const handleBookNow = (id) => {
    navigate(`/booking/${id}`);
  };

  const handleViewProfile = (id) => {
    navigate(`/worker/${id}`);
  };

  const clearFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedCounty('All Counties');
    setSelectedPrice('All Prices');
    setSearchTerm('');
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8">
      <div className="container mx-auto px-4">

        {/* ===== HEADER ===== */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
            Find Workers
          </h1>
          <p className="text-[#6b7280] mt-1">
            {filteredWorkers.length} workers available across {new Set(allWorkers.map(w => w.county)).size} counties
          </p>
        </div>

        {/* ===== SEARCH BAR ===== */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6b7280]" />
            <input
              type="text"
              placeholder="Search workers by name, skill, or county..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent text-[#0f172a]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6b7280] hover:text-[#0f172a]"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>

        {/* ===== FILTERS ===== */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#e5e7eb] text-[#0f172a] font-medium mb-3"
          >
            <FiFilter />
            Filters
            <FiChevronDown className={`transition ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-white border border-[#e5e7eb] rounded-xl text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="px-4 py-2 bg-white border border-[#e5e7eb] rounded-xl text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              >
                {counties.map(county => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>

              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="px-4 py-2 bg-white border border-[#e5e7eb] rounded-xl text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>

              {(selectedCategory !== 'All Categories' || selectedCounty !== 'All Counties' || selectedPrice !== 'All Prices' || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-[#1a56db] hover:text-[#1e40af] font-medium"
                >
                  Clear Filters
                </button>
              )}

              <div className="flex gap-1 bg-white border border-[#e5e7eb] rounded-xl p-1 ml-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-[#1a56db] text-white' : 'text-[#6b7280] hover:bg-gray-100'}`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-[#1a56db] text-white' : 'text-[#6b7280] hover:bg-gray-100'}`}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RESULTS COUNT ===== */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-[#6b7280] text-sm">
            Showing <span className="font-bold text-[#0f172a]">{filteredWorkers.length}</span> of {allWorkers.length} workers
          </p>
        </div>

        {/* ===== WORKERS GRID ===== */}
        {filteredWorkers.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#e5e7eb]">
            <p className="text-[#6b7280] text-lg">No workers found matching your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-[#1a56db] hover:text-[#1e40af] font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}>
            {filteredWorkers.map((worker) => (
              <div 
                key={worker.id}
                className={`bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border border-[#e5e7eb] hover:border-[#1a56db]/20 ${viewMode === 'list' ? 'flex' : ''}`}
                onClick={() => handleViewProfile(worker.id)}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                  <img 
                    src={worker.image} 
                    alt={worker.name}
                    className={`w-full ${viewMode === 'list' ? 'h-full object-cover' : 'h-56'} group-hover:scale-105 transition duration-300`}
                  />
                  <div className="absolute top-3 left-3 bg-[#f59e0b] text-[#0f172a] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    New
                  </div>
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
                    <div className="absolute bottom-3 left-3 bg-[#6b7280] text-white px-3 py-1 rounded-full text-xs shadow-lg">
                      Busy
                    </div>
                  )}
                </div>
                
                <div className={`p-5 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-[#0f172a]">{worker.name}</h3>
                      <p className="text-[#1a56db] font-medium text-sm">{worker.profession}</p>
                    </div>
                    {/* ===== NEW BADGE INSTEAD OF FAKE RATING ===== */}
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                      <FiUser className="text-gray-400 text-xs" />
                      <span className="text-xs text-gray-500">New</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {worker.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="bg-gray-100 text-[#6b7280] px-2 py-0.5 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                    {worker.skills.length > 3 && (
                      <span className="text-xs text-[#6b7280]">+{worker.skills.length - 3}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 mt-3 text-xs text-[#6b7280]">
                    <span className="flex items-center gap-1">
                      <FiMapPin className="text-[#6b7280]" />
                      {worker.county}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="text-[#6b7280]" />
                      {worker.responseTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiBriefcase className="text-[#6b7280]" />
                      {worker.experience}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e5e7eb]">
                    <div>
                      <p className="text-xs text-[#6b7280]">From</p>
                      <p className="text-xl font-bold text-[#1a56db]">KES {worker.price}</p>
                      <p className="text-xs text-[#6b7280]">/ hour</p>
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
        )}

        {/* ===== BOTTOM COUNT ===== */}
        <div className="mt-8 text-center text-[#6b7280] text-sm">
          Showing {filteredWorkers.length} of {allWorkers.length} workers
          {filteredWorkers.length < allWorkers.length && (
            <button
              onClick={clearFilters}
              className="ml-2 text-[#1a56db] hover:text-[#1e40af] font-medium"
            >
              Clear filters to see all
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkersPage;