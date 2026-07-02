import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#2c3e50] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-[#3498db]">
            Jirani Services
          </Link>
          <div className="flex gap-6 items-center">
            <Link to="/" className="hover:text-[#3498db] transition">Home</Link>
            <Link to="/workers" className="hover:text-[#3498db] transition">Workers</Link>
            <Link to="/request" className="hover:text-[#3498db] transition">Request</Link>
            <Link to="/apply" className="hover:text-[#3498db] transition">Apply</Link>
            <Link to="/admin/login" className="hover:text-[#3498db] transition">Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
