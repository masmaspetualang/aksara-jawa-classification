import React from 'react';
import { FiCpu, FiArrowRight, FiBookOpen } from 'react-icons/fi';

const LandingPage = ({ setActiveTab }) => {
  const characters = [
    { glyph: 'ꦲ', name: 'Ha' }, { glyph: 'ꦤ', name: 'Na' }, 
    { glyph: 'ꦕ', name: 'Ca' }, { glyph: 'ꦫ', name: 'Ra' }, 
    { glyph: 'ꦏ', name: 'Ka' }
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center py-16 bg-vintage-cream overflow-hidden">
      
      {/* Repeating Batik Background Pattern */}
      <div className="absolute inset-0 bg-batik opacity-[0.04] pointer-events-none"></div>

      {/* Background radial gradients for texture */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-vintage-beige/20 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-vintage-brown/5 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-vintage-beige/65 border border-vintage-brown/20 text-vintage-coffee text-xs font-semibold uppercase tracking-wider">
              <FiCpu className="text-vintage-brown animate-pulse" />
              <span>Pendekatan MobileNetV2</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-vintage-coffee leading-[1.1]">
                Klasifikasi Aksara Jawa <br className="hidden md:inline" />
              </h1>
              
              <p className="font-playfair text-lg sm:text-xl text-vintage-coffee/80 max-w-xl italic leading-relaxed">
                "Mengenali karakter Aksara Jawa menggunakan teknologi Deep Learning MobileNetV2 secara instan dan akurat."
              </p>
            </div>

            <p className="text-base text-vintage-coffee/75 max-w-lg leading-relaxed">
              Selamat datang di portal klasifikasi digital. Aplikasi ini memadukan kekayaan budaya aksara nusantara 
              dengan pendekatan MobileNetV2. Unggah gambar aksara Anda dan temukan maknanya dalam hitungan detik.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => setActiveTab('classification')}
                className="inline-flex items-center justify-center px-8 py-4 bg-vintage-brown text-vintage-cream font-bold rounded-lg shadow-lg border border-vintage-gold/50 transition-all duration-300 hover:bg-vintage-coffee hover:translate-y-[-2px] group"
              >
                <span>Mulai Klasifikasi</span>
                <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => setActiveTab('about')}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-vintage-brown font-bold rounded-lg border border-vintage-brown/40 hover:bg-vintage-beige/30 transition-all duration-300"
              >
                <FiBookOpen className="mr-2" />
                <span>Pelajari Selengkapnya</span>
              </button>
            </div>

            {/* Vintage Accent Divider */}
            <div className="flex items-center space-x-4 pt-4 opacity-40">
              <div className="h-[1px] w-16 bg-vintage-brown"></div>
              <span className="font-javanese text-vintage-brown text-lg">꧋ꦱꦸꦒꦼꦁꦫꦮꦸꦃ꧋</span>
              <div className="h-[1px] w-16 bg-vintage-brown"></div>
            </div>
          </div>

          {/* Right Illustration Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px] p-6 bg-vintage-cream rounded-2xl shadow-xl border-4 double border-vintage-brown/80">
              
              {/* Internal Frame */}
              <div className="border border-vintage-brown/30 p-6 rounded-lg relative bg-vintage-beige/25 flex flex-col items-center">
                
                {/* Floating particles */}
                <div className="absolute top-4 left-4 text-xs font-semibold text-vintage-brown/40 font-mono">MODEL: MOBILENETV2</div>
                <div className="absolute bottom-4 right-4 text-xs font-semibold text-vintage-brown/40 font-mono">ACCURACY: 98.7%</div>

                {/* Central Model Node Icon */}
                <div className="relative my-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-vintage-brown/5 rounded-full scale-150 animate-ping duration-1000"></div>
                  <div className="w-24 h-24 rounded-full bg-vintage-beige border border-vintage-brown flex items-center justify-center shadow-md relative z-10">
                    <FiCpu className="text-4xl text-vintage-brown animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                </div>

                {/* Aksara Jawa Display Strip */}
                <div className="w-full flex justify-between items-center bg-vintage-cream/90 border border-vintage-brown/30 rounded-lg p-4 shadow-sm">
                  {characters.map((c, idx) => (
                    <div key={idx} className="flex flex-col items-center group">
                      <span className="font-javanese text-2xl text-vintage-coffee transition-colors duration-300 group-hover:text-vintage-gold">
                        {c.glyph}
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-vintage-brown/70 mt-1">
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <h3 className="font-cinzel text-base font-bold text-vintage-coffee">Hanacaraka Klasifikasi</h3>
                  <p className="text-xs text-vintage-coffee/70 mt-1 max-w-[250px] mx-auto">
                    Menganalisis 20 aksara dasar Carakan secara komparatif dari citra digital.
                  </p>
                </div>
              </div>

              {/* Decorative Corner Borders */}
              <div className="absolute -top-2 -left-2 w-5 h-5 border-t-4 border-l-4 border-vintage-gold"></div>
              <div className="absolute -top-2 -right-2 w-5 h-5 border-t-4 border-r-4 border-vintage-gold"></div>
              <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-4 border-l-4 border-vintage-gold"></div>
              <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-4 border-r-4 border-vintage-gold"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;
