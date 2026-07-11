import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ClassificationPage from './pages/ClassificationPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <LandingPage setActiveTab={setActiveTab} />;
      case 'classification':
        return <ClassificationPage />;
      case 'history':
        return <HistoryPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-vintage-cream text-vintage-coffee flex flex-col font-inter selection:bg-vintage-brown/20 selection:text-vintage-coffee">
      {/* Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Vintage Footer */}
      <footer className="bg-vintage-cream border-t-4 border-double border-vintage-brown/60 py-8 relative">
        <div className="absolute inset-0 bg-batik opacity-[0.02] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          
          <div className="flex justify-center items-center space-x-3 opacity-60">
            <div className="h-[1px] w-8 bg-vintage-brown"></div>
            <span className="font-javanese text-sm text-vintage-coffee">꧋ꦱꦸꦒꦼꦁꦏꦂꦪ꧋</span>
            <div className="h-[1px] w-8 bg-vintage-brown"></div>
          </div>

          <p className="text-[10px] uppercase font-bold tracking-widest text-vintage-coffee/50">
            Aksara Jawa Classifier &copy; {new Date().getFullYear()} &bull; MobileNetV2 Neural Network
          </p>
          <p className="text-[11px] text-vintage-coffee/60 max-w-md mx-auto">
            Portal Edukasi Digital Aksara Jawa. Dibuat menggunakan React, FastAPI, TensorFlow, dan PostgreSQL.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
