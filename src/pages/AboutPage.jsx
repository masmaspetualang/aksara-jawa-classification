import React from 'react';
import { FiBook, FiCpu, FiDatabase, FiServer, FiSettings } from 'react-icons/fi';

const AboutPage = () => {
  const techStack = [
    {
      icon: <FiCpu className="text-2xl text-vintage-brown" />,
      title: 'Deep Learning (MobileNetV2)',
      desc: 'MobileNetV2 (TensorFlow/Keras) digunakan sebagai model dasar transfer learning yang dilatih untuk mengenali 20 kelas aksara dasar dengan parameter masukan citra 224x224 RGB.',
    },
    {
      icon: <FiServer className="text-2xl text-vintage-brown" />,
      title: 'FastAPI Backend',
      desc: 'Kerangka kerja API berkecepatan tinggi berbasis Python. Menangani pemrosesan awal citra (resizing & normalisasi), pemanggilan model, dan interaksi dengan database.',
    },
    {
      icon: <FiBook className="text-2xl text-vintage-brown" />,
      title: 'React Frontend',
      desc: 'Dibangun menggunakan React, Vite, dan Tailwind CSS. Antarmuka vintage premium yang responsif dengan pemuatan font aksara lokal secara dinamis.',
    },
    {
      icon: <FiDatabase className="text-2xl text-vintage-brown" />,
      title: 'PostgreSQL DB',
      desc: 'Menyimpan riwayat klasifikasi secara relasional, meliputi nama aksara terprediksi, akurasi, timestamp, dan alamat penyimpanan file citra.',
    },
    {
      icon: <FiSettings className="text-2xl text-vintage-brown" />,
      title: 'Docker Compose',
      desc: 'Menyatukan seluruh modul (frontend, backend, database) dalam kontainer terisolasi yang dapat dijalankan secara instan dengan satu perintah.',
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 bg-vintage-cream">
      
      {/* Repeating Batik Pattern Background */}
      <div className="absolute inset-0 bg-batik opacity-[0.03] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto z-10 space-y-12">
        
        {/* Page Title */}
        <div className="text-center space-y-2">
          <h2 className="font-cinzel text-3xl font-bold tracking-wider text-vintage-coffee">
            Tentang Penelitian & Aplikasi
          </h2>
          <p className="text-sm font-playfair italic text-vintage-brown">
            Implementasi Transfer Learning MobileNetV2 untuk klasifikasi karakter Aksara Jawa berbasis citra
          </p>
          <div className="w-24 h-[1px] bg-vintage-brown mx-auto mt-4"></div>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cultural & Educational */}
          <div className="md:col-span-6 space-y-6 text-left bg-vintage-cream p-6 rounded-xl border border-vintage-brown/30 shadow-md">
            <h3 className="font-cinzel text-lg font-bold text-vintage-coffee border-b border-vintage-brown/20 pb-2">
              Sejarah Singkat Aksara Jawa
            </h3>
            
            <p className="text-xs text-vintage-coffee/85 leading-relaxed">
              Aksara Jawa (dikenal juga sebagai Carakan atau Dentawanjana) adalah salah satu aksara tradisional 
              Nusantara yang berkembang di Pulau Jawa. Aksara ini secara tradisional digunakan untuk menulis 
              bahasa Jawa, bahasa Sanskerta, dan bahasa Kawi.
            </p>

            <div className="bg-vintage-beige/25 p-4 rounded-lg border border-vintage-brown/15 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-vintage-brown block">
                Legenda Aji Saka
              </span>
              <p className="text-xs text-vintage-coffee/80 italic font-playfair leading-relaxed">
                Susunan 20 aksara dasar membentuk panguripan (puisi) yang menceritakan kesetiaan dua utusan Raja Aji Saka 
                bernama Dora dan Sembada yang memperebutkan pusaka raja hingga keduanya gugur:
              </p>
              <div className="text-center py-2 border-y border-vintage-brown/10 space-y-1">
                <p className="font-javanese text-lg text-vintage-coffee tracking-wide select-none">
                  ꦲꦤꦱꦫꦏ ꦢꦠꦱꦮꦭ ꦥꦝꦗꦱꦚ ꦩꦓꦧꦛꦔ
                </p>
                <p className="text-[10px] font-bold text-vintage-brown uppercase font-mono tracking-widest mt-1">
                  Ha-Na-Ca-Ra-Ka | Da-Ta-Sa-Wa-La | Pa-Dha-Ja-Ya-Nya | Ma-Ga-Ba-Tha-Nga
                </p>
              </div>
              <ul className="text-[11px] text-vintage-coffee/80 list-disc list-inside space-y-1 pl-1">
                <li><span className="font-semibold text-vintage-brown">Hana Caraka:</span> Ada utusan / pembawa cerita</li>
                <li><span className="font-semibold text-vintage-brown">Data Sawala:</span> Saling berselisih pendapat / bertengkar</li>
                <li><span className="font-semibold text-vintage-brown">Padha Jayanya:</span> Keduanya sama-sama sakti</li>
                <li><span className="font-semibold text-vintage-brown">Maga Bathanga:</span> Keduanya sama-sama menjadi mayat</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-vintage-coffee/80 mb-1.5">Tujuan Aplikasi</h4>
              <p className="text-xs text-vintage-coffee/80 leading-relaxed">
                Aplikasi ini bertujuan untuk melestarikan warisan budaya non-benda berupa Aksara Jawa melalui pendekatan 
                teknologi modern, menjembatani keterbacaan aksara kuno agar lebih mudah dipelajari oleh generasi muda.
              </p>
            </div>
          </div>

          {/* Right Column: Technology Architecture */}
          <div className="md:col-span-6 space-y-5">
            <h3 className="font-cinzel text-lg font-bold text-vintage-coffee border-b border-vintage-brown/20 pb-2 text-left">
              Arsitektur Teknologi
            </h3>
            
            <div className="space-y-4">
              {techStack.map((tech, idx) => (
                <div 
                  key={idx} 
                  className="bg-vintage-cream p-4 rounded-xl border border-vintage-brown/20 shadow-sm flex items-start space-x-4 hover:border-vintage-brown hover:shadow-md transition duration-200"
                >
                  <div className="p-2.5 bg-vintage-beige/40 rounded-lg border border-vintage-brown/15 shrink-0">
                    {tech.icon}
                  </div>
                  <div className="text-left space-y-1">
                    <h4 className="text-sm font-bold text-vintage-coffee">{tech.title}</h4>
                    <p className="text-xs text-vintage-coffee/75 leading-relaxed">{tech.desc}</p>
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

export default AboutPage;
