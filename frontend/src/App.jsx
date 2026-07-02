import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import WorkersPage from './pages/WorkersPage';
import WorkerProfilePage from './pages/WorkerProfilePage';
import BookingPage from './pages/BookingPage';
import ApplyPage from './pages/ApplyPage';
import RequestWorkerPage from './pages/RequestWorkerPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/workers" element={<MainLayout><WorkersPage /></MainLayout>} />
        <Route path="/worker/:id" element={<MainLayout><WorkerProfilePage /></MainLayout>} />
        <Route path="/booking/:workerId" element={<MainLayout><BookingPage /></MainLayout>} />
        <Route path="/apply" element={<MainLayout><ApplyPage /></MainLayout>} />
        <Route path="/request" element={<MainLayout><RequestWorkerPage /></MainLayout>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={
          <MainLayout>
            <div className="container mx-auto px-4 py-20 text-center">
              <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
              <button onClick={() => window.location.href = '/'} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
                Go Back Home
              </button>
            </div>
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
