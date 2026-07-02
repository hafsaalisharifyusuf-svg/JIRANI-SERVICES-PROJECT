import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2c3e50] text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Jirani Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
