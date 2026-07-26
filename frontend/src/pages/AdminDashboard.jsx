import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiUsers, FiBriefcase, FiUserPlus, FiLogOut, FiHome, 
  FiEye, FiEdit, FiTrash2, FiPlus, FiCheckCircle,
  FiRefreshCw, FiDownload, FiMenu, FiX, FiUser,
  FiClock, FiCheck, FiXCircle, FiFileText
} from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
import API_URL, { 
  deleteBooking, 
  deleteWorker, 
  deleteApplication,
  deleteRequest,
  updateBookingStatus,
  updateApplicationStatus
} from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    total_workers: 0,
    total_bookings: 0,
    pending_applications: 0,
    completed_jobs: 0,
    total_requests: 0,
    open_requests: 0
  });
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWorker, setNewWorker] = useState({
    name: '',
    profession: '',
    county: '',
    price: ''
  });

  // ===== FETCH DATA =====
  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const workersRes = await fetch(`${API_URL}/workers`);
      const workersData = await workersRes.json();

      const bookingsRes = await fetch(`${API_URL}/bookings`);
      const bookingsData = await bookingsRes.json();

      const appsRes = await fetch(`${API_URL}/applications`);
      const appsData = await appsRes.json();

      const requestsRes = await fetch(`${API_URL}/requests`);
      const requestsData = await requestsRes.json();

      if (workersData.success) {
        setWorkers(workersData.workers || []);
      }
      
      if (bookingsData.success) {
        setBookings(bookingsData.bookings || []);
      }

      if (appsData.success) {
        setApplications(appsData.applications || []);
      }

      if (requestsData.success) {
        setRequests(requestsData.requests || []);
      }

      setStats({
        total_workers: workersData.workers?.length || 0,
        total_bookings: bookingsData.bookings?.length || 0,
        pending_applications: appsData.applications?.filter(a => a.status === 'pending').length || 0,
        completed_jobs: bookingsData.bookings?.filter(b => b.status === 'completed').length || 0,
        total_requests: requestsData.requests?.length || 0,
        open_requests: requestsData.requests?.filter(r => r.status === 'open').length || 0
      });

    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ===== DELETE FUNCTIONS =====
  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    const result = await deleteBooking(id);
    if (result.success) {
      alert('Booking deleted!');
      fetchData();
    }
  };

  const handleDeleteWorker = async (id) => {
    if (!window.confirm('Delete this worker?')) return;
    const result = await deleteWorker(id);
    if (result.success) {
      alert('Worker deleted!');
      fetchData();
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    const result = await deleteApplication(id);
    if (result.success) {
      alert('Application deleted!');
      fetchData();
    }
  };

  const handleDeleteRequest = async (id) => {
    if (!window.confirm('Delete this request?')) return;
    const result = await deleteRequest(id);
    if (result.success) {
      alert('Request deleted!');
      fetchData();
    }
  };

  // ===== UPDATE STATUS FUNCTIONS =====
  const handleUpdateStatus = async (id, status) => {
    const result = await updateBookingStatus(id, status);
    if (result.success) {
      alert(`Booking ${status}!`);
      fetchData();
    }
  };

  const handleUpdateApplicationStatus = async (id, status) => {
    const result = await updateApplicationStatus(id, status);
    if (result.success) {
      alert(`Application ${status}!`);
      fetchData();
    }
  };

  const handleUpdateRequestStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/requests/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`Request ${status}!`);
        fetchData();
      }
    } catch (err) {
      alert('Network error');
    }
  };

  // ===== ADD WORKER =====
  const handleAddWorker = async () => {
    if (!newWorker.name || !newWorker.profession || !newWorker.county || !newWorker.price) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/workers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newWorker,
          price: parseFloat(newWorker.price),
          skills: [],
          is_verified: true,
          is_available: true
        }),
      });
      const data = await response.json();
      
      if (data.success) {
        alert('Worker added successfully!');
        setShowAddModal(false);
        setNewWorker({ name: '', profession: '', county: '', price: '' });
        fetchData();
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin/login');
  };

  const getStatusBadge = (status) => {
    const colors = { 
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      accepted: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
      open: 'bg-green-100 text-green-700',
      in_progress: 'bg-blue-100 text-blue-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  // ===== RENDER CONTENT =====
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-blue-500 p-2 rounded-lg text-white"><FiUsers /></div>
                  <span className="text-xs font-medium text-blue-600">{stats.total_workers}</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{stats.total_workers}</p>
                <p className="text-xs text-gray-500 mt-1">Total Workers</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-yellow-500 p-2 rounded-lg text-white"><FiUserPlus /></div>
                  <span className="text-xs font-medium text-yellow-600">{stats.pending_applications}</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{stats.pending_applications}</p>
                <p className="text-xs text-gray-500 mt-1">Pending Applications</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-green-500 p-2 rounded-lg text-white"><FiBriefcase /></div>
                  <span className="text-xs font-medium text-green-600">{stats.total_bookings}</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{stats.total_bookings}</p>
                <p className="text-xs text-gray-500 mt-1">Total Bookings</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-purple-500 p-2 rounded-lg text-white"><FiCheckCircle /></div>
                  <span className="text-xs font-medium text-purple-600">{stats.completed_jobs}</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{stats.completed_jobs}</p>
                <p className="text-xs text-gray-500 mt-1">Completed Jobs</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-orange-500 p-2 rounded-lg text-white"><FiFileText /></div>
                  <span className="text-xs font-medium text-orange-600">{stats.total_requests}</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{stats.total_requests}</p>
                <p className="text-xs text-gray-500 mt-1">Total Requests</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-teal-500 p-2 rounded-lg text-white"><FiClock /></div>
                  <span className="text-xs font-medium text-teal-600">{stats.open_requests}</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{stats.open_requests}</p>
                <p className="text-xs text-gray-500 mt-1">Open Requests</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Recent Bookings ({bookings.length})</h3>
                <button onClick={fetchData} className="text-sm text-blue-600 hover:text-blue-800">
                  <FiRefreshCw className="inline mr-1" /> Refresh
                </button>
              </div>
              <div className="overflow-x-auto">
                {bookings.length === 0 ? (
                  <div className="px-6 py-8 text-center"><p className="text-gray-500">No bookings yet</p></div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Worker</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 text-sm text-gray-800">{booking.customer_name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{booking.worker_name || 'Unknown'}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{booking.date_needed}</td>
                          <td className="px-6 py-4">
                            <span className={`${getStatusBadge(booking.status)} px-2 py-1 rounded-lg text-xs font-medium capitalize`}>
                              {booking.status || 'pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-blue-600">KES {booking.amount || 0}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-1">
                              {booking.status === 'pending' && (
                                <>
                                  <button onClick={() => handleUpdateStatus(booking.id, 'accepted')} className="p-1 text-green-600 hover:text-green-800" title="Accept"><FiCheck size={16} /></button>
                                  <button onClick={() => handleUpdateStatus(booking.id, 'cancelled')} className="p-1 text-red-600 hover:text-red-800" title="Reject"><FiXCircle size={16} /></button>
                                </>
                              )}
                              {booking.status === 'accepted' && (
                                <button onClick={() => handleUpdateStatus(booking.id, 'completed')} className="p-1 text-blue-600 hover:text-blue-800" title="Complete"><FiCheckCircle size={16} /></button>
                              )}
                              <button onClick={() => handleDeleteBooking(booking.id)} className="p-1 text-gray-400 hover:text-red-600" title="Delete"><FiTrash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        );

      case 'workers':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">All Workers ({workers.length})</h3>
              <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition text-sm flex items-center gap-1">
                <FiPlus /> Add Worker
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Worker</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profession</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">County</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {workers.map((worker) => (
                    <tr key={worker.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">
                            {worker.name?.charAt(0) || '?'}
                          </div>
                          <p className="font-medium text-gray-800">{worker.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{worker.profession}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{worker.county}</td>
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">KES {worker.price}</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-medium capitalize">
                          {worker.status || 'approved'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDeleteWorker(worker.id)} className="p-1 text-gray-400 hover:text-red-600" title="Delete">
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">All Bookings ({bookings.length})</h3>
            </div>
            <div className="overflow-x-auto">
              {bookings.length === 0 ? (
                <div className="px-6 py-8 text-center"><p className="text-gray-500">No bookings yet</p></div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Worker</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-800">{booking.customer_name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{booking.worker_name || 'Unknown'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{booking.date_needed}</td>
                        <td className="px-6 py-4">
                          <span className={`${getStatusBadge(booking.status)} px-2 py-1 rounded-lg text-xs font-medium capitalize`}>
                            {booking.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-blue-600">KES {booking.amount || 0}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            {booking.status === 'pending' && (
                              <>
                                <button onClick={() => handleUpdateStatus(booking.id, 'accepted')} className="p-1 text-green-600 hover:text-green-800" title="Accept"><FiCheck size={16} /></button>
                                <button onClick={() => handleUpdateStatus(booking.id, 'cancelled')} className="p-1 text-red-600 hover:text-red-800" title="Reject"><FiXCircle size={16} /></button>
                              </>
                            )}
                            {booking.status === 'accepted' && (
                              <button onClick={() => handleUpdateStatus(booking.id, 'completed')} className="p-1 text-blue-600 hover:text-blue-800" title="Complete"><FiCheckCircle size={16} /></button>
                            )}
                            <button onClick={() => handleDeleteBooking(booking.id)} className="p-1 text-gray-400 hover:text-red-600" title="Delete"><FiTrash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        );

      case 'applications':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Applications ({applications.length})</h3>
            </div>
            <div className="overflow-x-auto">
              {applications.length === 0 ? (
                <div className="px-6 py-8 text-center"><p className="text-gray-500">No applications yet</p></div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profession</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">County</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-800">{app.full_name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{app.profession}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{app.county}</td>
                        <td className="px-6 py-4 text-sm font-medium text-blue-600">KES {app.hourly_rate}</td>
                        <td className="px-6 py-4">
                          <span className={`${getStatusBadge(app.status)} px-2 py-1 rounded-lg text-xs font-medium capitalize`}>
                            {app.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            {app.status === 'pending' && (
                              <>
                                <button onClick={() => handleUpdateApplicationStatus(app.id, 'approved')} className="p-1 text-green-600 hover:text-green-800" title="Approve"><FiCheck size={16} /></button>
                                <button onClick={() => handleUpdateApplicationStatus(app.id, 'rejected')} className="p-1 text-red-600 hover:text-red-800" title="Reject"><FiXCircle size={16} /></button>
                              </>
                            )}
                            <button onClick={() => handleDeleteApplication(app.id)} className="p-1 text-gray-400 hover:text-red-600" title="Delete"><FiTrash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        );

      case 'requests':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Service Requests ({requests.length})</h3>
            </div>
            <div className="overflow-x-auto">
              {requests.length === 0 ? (
                <div className="px-6 py-8 text-center"><p className="text-gray-500">No requests yet</p></div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {requests.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{req.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{req.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{req.location}</td>
                        <td className="px-6 py-4 text-sm font-medium text-blue-600">KES {req.budget || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className={`${getStatusBadge(req.status)} px-2 py-1 rounded-lg text-xs font-medium capitalize`}>
                            {req.status || 'open'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            {req.status === 'open' && (
                              <>
                                <button onClick={() => handleUpdateRequestStatus(req.id, 'in_progress')} className="p-1 text-blue-600 hover:text-blue-800" title="Start">
                                  <FiClock size={16} />
                                </button>
                                <button onClick={() => handleUpdateRequestStatus(req.id, 'completed')} className="p-1 text-green-600 hover:text-green-800" title="Complete">
                                  <FiCheckCircle size={16} />
                                </button>
                              </>
                            )}
                            {req.status === 'in_progress' && (
                              <button onClick={() => handleUpdateRequestStatus(req.id, 'completed')} className="p-1 text-green-600 hover:text-green-800" title="Complete">
                                <FiCheckCircle size={16} />
                              </button>
                            )}
                            <button onClick={() => handleDeleteRequest(req.id)} className="p-1 text-gray-400 hover:text-red-600" title="Delete">
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className={`bg-[#2c3e50] text-white w-64 min-h-screen fixed left-0 top-0 z-40 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-[#3498db]">Jirani Admin</h1>
          <p className="text-xs text-gray-400 mt-1">Dashboard Panel</p>
        </div>
        <nav className="p-4 space-y-1">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
            <FiHome /><span>Overview</span>
          </button>
          <button onClick={() => setActiveTab('workers')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'workers' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
            <FiUsers /><span>Workers</span>
          </button>
          <button onClick={() => setActiveTab('bookings')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
            <FiBriefcase /><span>Bookings</span>
          </button>
          <button onClick={() => setActiveTab('applications')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'applications' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
            <FiUserPlus /><span>Applications</span>
          </button>
          <button onClick={() => setActiveTab('requests')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeTab === 'requests' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
            <FiFileText /><span>Requests</span>
          </button>
          <div className="border-t border-gray-700 mt-4 pt-4">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 transition text-gray-300 hover:text-white">
              <FiLogOut /><span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-gray-600 hover:text-gray-800">
                {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
              <h2 className="text-lg font-semibold text-gray-800 capitalize">{activeTab}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={fetchData} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition" title="Refresh">
                <FiRefreshCw />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-600 text-sm">
              {error}
            </div>
          )}
          {renderContent()}
        </div>
      </div>

      {/* ===== ADD WORKER MODAL ===== */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#0f172a]">Add New Worker</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <FiXCircle size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" value={newWorker.name} onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })} placeholder="e.g., John Doe" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profession *</label>
                <input type="text" value={newWorker.profession} onChange={(e) => setNewWorker({ ...newWorker, profession: e.target.value })} placeholder="e.g., Electrician" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">County *</label>
                <input type="text" value={newWorker.county} onChange={(e) => setNewWorker({ ...newWorker, county: e.target.value })} placeholder="e.g., Nairobi" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (KES) *</label>
                <input type="number" value={newWorker.price} onChange={(e) => setNewWorker({ ...newWorker, price: e.target.value })} placeholder="e.g., 1500" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]" />
              </div>
              <button onClick={handleAddWorker} className="w-full bg-[#1a56db] text-white py-3 rounded-xl hover:bg-[#1e40af] transition font-semibold">
                Add Worker
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
