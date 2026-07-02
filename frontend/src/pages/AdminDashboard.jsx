import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiBriefcase, FiUserPlus, FiLogOut, FiHome, FiMenu, FiX, FiCheckCircle } from 'react-icons/fi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const stats = [
    { title: 'Total Workers', value: '48', change: '+12%', icon: FiUsers, color: 'bg-blue-500' },
    { title: 'Pending Applications', value: '12', change: '+3', icon: FiUserPlus, color: 'bg-yellow-500' },
    { title: 'Total Bookings', value: '156', change: '+28%', icon: FiBriefcase, color: 'bg-green-500' },
    { title: 'Completed Jobs', value: '89', change: '+15%', icon: FiCheckCircle, color: 'bg-purple-500' },
  ];

  const workers = [
    { id: 1, name: 'Ahmed Ali', profession: 'Electrician', location: 'Garissa', status: 'approved', verified: true },
    { id: 2, name: 'Jane Wanjiku', profession: 'Plumber', location: 'Nairobi', status: 'pending', verified: false },
    { id: 3, name: 'John Otieno', profession: 'Mechanic', location: 'Kisumu', status: 'approved', verified: false },
  ];

  const recentBookings = [
    { id: 1, customer: 'David Ochieng', worker: 'Ahmed Ali', date: '2024-06-20', status: 'completed', amount: 1500 },
    { id: 2, customer: 'Sarah Mwangi', worker: 'Jane Wanjiku', date: '2024-06-21', status: 'pending', amount: 1200 },
    { id: 3, customer: 'Michael Kariuki', worker: 'John Otieno', date: '2024-06-22', status: 'pending', amount: 2000 },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin/login');
  };

  const getStatusBadge = (status) => {
    const colors = { 
      pending: 'bg-yellow-100 text-yellow-700', 
      approved: 'bg-green-100 text-green-700', 
      completed: 'bg-blue-100 text-blue-700' 
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-[#2c3e50] text-white w-64 min-h-screen fixed left-0 top-0 z-40 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-[#3498db]">Jirani Admin</h1>
          <p className="text-xs text-gray-400 mt-1">Dashboard Panel</p>
        </div>
        <nav className="p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-600 text-white transition">
            <FiHome /><span>Overview</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition">
            <FiUsers /><span>Workers</span>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition">
            <span className="flex items-center gap-3"><FiUserPlus /><span>Applications</span></span>
            <span className="bg-gray-600 text-white text-xs px-2 py-0.5 rounded-full">12</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition">
            <FiBriefcase /><span>Bookings</span>
          </button>
          <div className="border-t border-gray-700 mt-4 pt-4">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 transition text-gray-300 hover:text-white">
              <FiLogOut /><span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-gray-600 hover:text-gray-800">
                {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
              <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`${stat.color} p-2 rounded-lg text-white`}>
                      <Icon />
                    </div>
                    <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* Workers Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Worker Applications</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Worker</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profession</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {workers.map((worker) => (
                    <tr key={worker.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">
                            {worker.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{worker.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{worker.profession}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{worker.location}</td>
                      <td className="px-6 py-4">
                        <span className={`${getStatusBadge(worker.status)} px-2 py-1 rounded-lg text-xs font-medium capitalize`}>
                          {worker.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Recent Bookings</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="px-6 py-4 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{booking.customer}</p>
                      <p className="text-sm text-gray-500">with {booking.worker}</p>
                      <p className="text-xs text-gray-400 mt-1">{booking.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">KES {booking.amount}</p>
                      <span className={`${getStatusBadge(booking.status)} px-2 py-0.5 rounded-lg text-xs font-medium capitalize`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
