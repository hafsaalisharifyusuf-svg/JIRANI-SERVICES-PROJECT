// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ===== AUTH SERVICES =====
export const authService = {
  // Login user
  login: async (email, password) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Register user
  register: async (userData) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminLoggedIn');
  },

  // Get current user
  getCurrentUser: async () => {
    return apiCall('/auth/me');
  },

  // Admin login
  adminLogin: async (email, password) => {
    return apiCall('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
};

// ===== WORKER SERVICES =====
export const workerService = {
  // Get all workers
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiCall(`/workers?${queryParams}`);
  },

  // Get single worker
  getOne: async (id) => {
    return apiCall(`/workers/${id}`);
  },

  // Create worker (apply)
  create: async (workerData) => {
    return apiCall('/workers', {
      method: 'POST',
      body: JSON.stringify(workerData),
    });
  },

  // Update worker
  update: async (id, workerData) => {
    return apiCall(`/workers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(workerData),
    });
  },

  // Delete worker
  delete: async (id) => {
    return apiCall(`/workers/${id}`, {
      method: 'DELETE',
    });
  },

  // Approve worker (admin)
  approve: async (id) => {
    return apiCall(`/workers/${id}/approve`, {
      method: 'PATCH',
    body: JSON.stringify({ status: 'approved' }),
    });
  },

  // Reject worker (admin)
  reject: async (id) => {
    return apiCall(`/workers/${id}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'rejected' }),
    });
  },

  // Get workers by category
  getByCategory: async (category) => {
    return apiCall(`/workers/category/${category}`);
  },

  // Get featured workers
  getFeatured: async () => {
    return apiCall('/workers/featured');
  },

  // Search workers
  search: async (query) => {
    return apiCall(`/workers/search?q=${query}`);
  },
};

// ===== BOOKING SERVICES =====
export const bookingService = {
  // Get all bookings
  getAll: async () => {
    return apiCall('/bookings');
  },

  // Get single booking
  getOne: async (id) => {
    return apiCall(`/bookings/${id}`);
  },

  // Create booking
  create: async (bookingData) => {
    return apiCall('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  // Update booking status
  updateStatus: async (id, status) => {
    return apiCall(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // Get bookings by worker
  getByWorker: async (workerId) => {
    return apiCall(`/bookings/worker/${workerId}`);
  },

  // Get bookings by customer
  getByCustomer: async (customerId) => {
    return apiCall(`/bookings/customer/${customerId}`);
  },

  // Cancel booking
  cancel: async (id) => {
    return apiCall(`/bookings/${id}/cancel`, {
      method: 'PATCH',
    });
  },

  // Get booking stats
  getStats: async () => {
    return apiCall('/bookings/stats');
  },
};

// ===== REQUEST SERVICES =====
export const requestService = {
  // Get all requests
  getAll: async () => {
    return apiCall('/requests');
  },

  // Get single request
  getOne: async (id) => {
    return apiCall(`/requests/${id}`);
  },

  // Create request
  create: async (requestData) => {
    return apiCall('/requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },

  // Update request status
  updateStatus: async (id, status) => {
    return apiCall(`/requests/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // Delete request
  delete: async (id) => {
    return apiCall(`/requests/${id}`, {
      method: 'DELETE',
    });
  },

  // Get requests by location
  getByLocation: async (location) => {
    return apiCall(`/requests/location/${location}`);
  },
};

// ===== CATEGORY SERVICES =====
export const categoryService = {
  // Get all categories
  getAll: async () => {
    return apiCall('/categories');
  },

  // Get category by name
  getByName: async (name) => {
    return apiCall(`/categories/${name}`);
  },

  // Get category with workers
  getWithWorkers: async (name) => {
    return apiCall(`/categories/${name}/workers`);
  },
};

// ===== ADMIN SERVICES =====
export const adminService = {
  // Get admin stats
  getStats: async () => {
    return apiCall('/admin/stats');
  },

  // Get all users
  getUsers: async () => {
    return apiCall('/admin/users');
  },

  // Update user role
  updateUserRole: async (userId, role) => {
    return apiCall(`/admin/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  },

  // Delete user
  deleteUser: async (userId) => {
    return apiCall(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  },

  // Get all applications
  getApplications: async () => {
    return apiCall('/admin/applications');
  },

  // Approve application
  approveApplication: async (id) => {
    return apiCall(`/admin/applications/${id}/approve`, {
      method: 'PATCH',
    });
  },

  // Reject application
  rejectApplication: async (id) => {
    return apiCall(`/admin/applications/${id}/reject`, {
      method: 'PATCH',
    });
  },

  // Get all bookings (admin)
  getAllBookings: async () => {
    return apiCall('/admin/bookings');
  },

  // Get platform analytics
  getAnalytics: async () => {
    return apiCall('/admin/analytics');
  },
};

// ===== UPLOAD SERVICES =====
export const uploadService = {
  // Upload single image
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return apiCall('/upload/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  },

  // Upload multiple images
  uploadMultiple: async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    
    return apiCall('/upload/multiple', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  },

  // Upload profile image
  uploadProfile: async (file) => {
    const formData = new FormData();
    formData.append('profile', file);
    
    return apiCall('/upload/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  },

  // Upload ID document
  uploadDocument: async (file) => {
    const formData = new FormData();
    formData.append('document', file);
    
    return apiCall('/upload/document', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  },
};

// ===== NOTIFICATION SERVICES =====
export const notificationService = {
  // Get user notifications
  getMyNotifications: async () => {
    return apiCall('/notifications');
  },

  // Mark notification as read
  markAsRead: async (id) => {
    return apiCall(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  },

  // Mark all as read
  markAllAsRead: async () => {
    return apiCall('/notifications/read-all', {
      method: 'PATCH',
    });
  },

  // Get unread count
  getUnreadCount: async () => {
    return apiCall('/notifications/unread-count');
  },
};

// ===== REVIEW SERVICES =====
export const reviewService = {
  // Get reviews for a worker
  getWorkerReviews: async (workerId) => {
    return apiCall(`/reviews/worker/${workerId}`);
  },

  // Create review
  create: async (reviewData) => {
    return apiCall('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  // Update review
  update: async (id, reviewData) => {
    return apiCall(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
  },

  // Delete review
  delete: async (id) => {
    return apiCall(`/reviews/${id}`, {
      method: 'DELETE',
    });
  },
};

// Default export for convenience
export default {
  auth: authService,
  workers: workerService,
  bookings: bookingService,
  requests: requestService,
  categories: categoryService,
  admin: adminService,
  upload: uploadService,
  notifications: notificationService,
  reviews: reviewService,
};