// ===== PERMANENT API CONFIGURATION =====
const API_URL = 'http://localhost:5000/api';

export default API_URL;

// ===== WORKERS =====
export const getWorkers = async () => {
  const res = await fetch(`${API_URL}/workers`);
  return res.json();
};

export const getWorker = async (id) => {
  const res = await fetch(`${API_URL}/workers/${id}`);
  return res.json();
};

export const deleteWorker = async (id) => {
  const res = await fetch(`${API_URL}/workers/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

// ===== BOOKINGS =====
export const createBooking = async (data) => {
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getBookings = async () => {
  const res = await fetch(`${API_URL}/bookings`);
  return res.json();
};

export const deleteBooking = async (id) => {
  const res = await fetch(`${API_URL}/bookings/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const updateBookingStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/bookings/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

// ===== APPLICATIONS =====
export const createApplication = async (data) => {
  const res = await fetch(`${API_URL}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getApplications = async () => {
  const res = await fetch(`${API_URL}/applications`);
  return res.json();
};

export const deleteApplication = async (id) => {
  const res = await fetch(`${API_URL}/applications/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const updateApplicationStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/applications/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

// ===== REQUESTS =====
export const createRequest = async (data) => {
  const res = await fetch(`${API_URL}/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getRequests = async () => {
  const res = await fetch(`${API_URL}/requests`);
  return res.json();
};

export const deleteRequest = async (id) => {
  const res = await fetch(`${API_URL}/requests/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const updateRequestStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/requests/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

// ===== ADMIN =====
export const getAdminStats = async () => {
  const res = await fetch(`${API_URL}/admin/stats`);
  return res.json();
};

// ===== AUTH =====
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};
