import React from 'react';
import { FiCpu, FiClock, FiHome, FiInfo, FiBook } from 'react-icons/fi';

const Navbar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <FiHome className="mr-1.5" /> },
    { id: 'classification', label: 'Classification', icon: <FiCpu className="mr-1.5" /> },
    { id: 'history', label: 'History', icon: <FiClock className="mr-1.5" /> },
    { id: 'about', label: 'About', icon: <FiInfo className="mr-1.5" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-vintage-cream/95 backdrop-blur shadow-sm border-b-4 border-double border-vintage-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo / Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-vintage-brown text-vintage-cream p-2.5 rounded-lg shadow-sm border border-vintage-gold/50 flex items-center justify-center">
              <span className="font-javanese text-2xl leading-none">ꦲ</span>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-xl font-bold tracking-wider text-vintage-coffee leading-tight">
                Aksara Jawa Classifier
              </span>
              <span className="text-[10px] uppercase font-semibold text-vintage-brown/70 tracking-widest leading-none">
                Museum Digital & Klasifikasi
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex space-x-1 md:space-x-4">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center px-3.5 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'bg-vintage-brown text-vintage-cream shadow-md border border-vintage-gold/30'
                      : 'text-vintage-coffee/85 hover:bg-vintage-beige/50 hover:text-vintage-brown'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
      
      {/* Decorative Javanese Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-vintage-gold to-transparent opacity-60"></div>
    </nav>
  );
};

export default Navbar;
