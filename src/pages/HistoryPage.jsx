import React, { useState, useEffect } from 'react';
import { FiClock, FiSearch, FiTrendingUp, FiCheckCircle, FiChevronLeft, FiChevronRight, FiImage, FiFilter, FiTrash2 } from 'react-icons/fi';
import { getPredictionHistory, deletePredictionHistoryItem } from '../services/api';
import { getCharacterDetails } from '../utils/characterMap';
import Swal from 'sweetalert2';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Lightbox modal for full size image viewing
  const [lightboxImage, setLightboxImage] = useState(null);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const data = await getPredictionHistory();
      setHistory(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Gagal memuat riwayat klasifikasi. Pastikan konfigurasi Supabase Anda benar.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data riwayat prediksi ini akan dihapus secara permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8C6239',
      cancelButtonColor: '#36220F',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
      background: '#FAF5EC',
      color: '#36220F'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePredictionHistoryItem(id);
          setHistory((prev) => prev.filter((item) => item.id !== id));
          Swal.fire({
            title: 'Terhapus!',
            text: 'Riwayat prediksi telah berhasil dihapus.',
            icon: 'success',
            confirmButtonColor: '#8C6239',
            background: '#FAF5EC',
            color: '#36220F'
          });
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: 'Gagal!',
            text: 'Gagal menghapus riwayat prediksi. Silakan coba lagi.',
            icon: 'error',
            confirmButtonColor: '#8C6239',
            background: '#FAF5EC',
            color: '#36220F'
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Compute Statistics
  const getStatistics = () => {
    if (history.length === 0) {
      return { total: 0, mostRecognized: '-', avgConfidence: '0%' };
    }

    // Total
    const total = history.length;

    // Average Confidence
    const sumConf = history.reduce((sum, item) => sum + item.confidence, 0);
    const avgConfidence = `${((sumConf / total) * 100).toFixed(1)}%`;

    // Most Recognized Character
    const counts = {};
    history.forEach((item) => {
      const pred = item.prediction;
      counts[pred] = (counts[pred] || 0) + 1;
    });

    let mostRec = '-';
    let maxCount = 0;
    Object.keys(counts).forEach((key) => {
      if (counts[key] > maxCount) {
        maxCount = counts[key];
        mostRec = key;
      }
    });

    const charDetails = getCharacterDetails(mostRec);
    const mostRecognized = charDetails 
      ? `${charDetails.name} (${charDetails.glyph})` 
      : mostRec;

    return { total, mostRecognized, avgConfidence };
  };

  const { total, mostRecognized, avgConfidence } = getStatistics();

  // Filter & Search Logic
  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.prediction.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === '' || item.prediction.toLowerCase() === classFilter.toLowerCase();
    return matchesSearch && matchesClass;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, classFilter]);

  // Unique classes for dropdown filter
  const uniqueClasses = Array.from(new Set(history.map(item => item.prediction))).sort();

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 bg-vintage-cream">
      
      {/* Repeating Batik Pattern Background */}
      <div className="absolute inset-0 bg-batik opacity-[0.03] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto z-10 space-y-10">
        
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h2 className="font-cinzel text-3xl font-bold tracking-wider text-vintage-coffee">
            Riwayat Klasifikasi
          </h2>
          <p className="text-sm font-playfair italic text-vintage-brown">
            Kumpulan data klasifikasi yang disimpan di dalam database PostgreSQL
          </p>
          <div className="w-24 h-[1px] bg-vintage-brown mx-auto mt-4"></div>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total */}
          <div className="bg-vintage-cream p-5 rounded-xl border border-vintage-brown/40 shadow-md flex items-center space-x-4">
            <div className="p-3.5 bg-vintage-beige/50 text-vintage-brown rounded-lg border border-vintage-brown/20">
              <FiClock className="text-2xl" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-vintage-coffee/60 leading-none">Total Prediksi</p>
              <h4 className="text-3xl font-extrabold text-vintage-coffee mt-1 font-mono">{total}</h4>
            </div>
          </div>

          {/* Card 2: Most Recognized */}
          <div className="bg-vintage-cream p-5 rounded-xl border border-vintage-brown/40 shadow-md flex items-center space-x-4">
            <div className="p-3.5 bg-vintage-beige/50 text-vintage-brown rounded-lg border border-vintage-brown/20">
              <FiTrendingUp className="text-2xl" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-vintage-coffee/60 leading-none">Aksara Terbanyak</p>
              <h4 className="text-2xl font-bold text-vintage-coffee mt-1 select-none flex items-center gap-1.5 leading-tight">
                {mostRecognized}
              </h4>
            </div>
          </div>

          {/* Card 3: Avg Confidence */}
          <div className="bg-vintage-cream p-5 rounded-xl border border-vintage-brown/40 shadow-md flex items-center space-x-4">
            <div className="p-3.5 bg-vintage-beige/50 text-vintage-brown rounded-lg border border-vintage-brown/20">
              <FiCheckCircle className="text-2xl" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-vintage-coffee/60 leading-none">Rata-rata Akurasi</p>
              <h4 className="text-3xl font-extrabold text-vintage-coffee mt-1 font-mono">{avgConfidence}</h4>
            </div>
          </div>
        </div>

        {/* Filters and Table Section */}
        <div className="bg-vintage-cream p-6 rounded-xl shadow-lg border-2 border-vintage-brown/50 space-y-6">
          
          {/* Search and Filters bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-vintage-beige/20 p-4 rounded-lg border border-vintage-brown/15">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-vintage-brown/60" />
              <input
                type="text"
                placeholder="Cari aksara (contoh: Ha)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-vintage-brown/30 bg-vintage-cream text-vintage-coffee placeholder-vintage-coffee/40 text-sm focus:outline-none focus:border-vintage-brown"
              />
            </div>

            {/* Dropdown Class Filter */}
            <div className="relative w-full sm:max-w-[220px] flex items-center space-x-2">
              <FiFilter className="text-vintage-brown/70 shrink-0" />
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-vintage-brown/30 bg-vintage-cream text-vintage-coffee text-sm focus:outline-none focus:border-vintage-brown cursor-pointer"
              >
                <option value="">Semua Karakter</option>
                {uniqueClasses.map((cls, idx) => (
                  <option key={idx} value={cls}>Aksara {cls}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Data Table */}
          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-vintage-brown/20 border-t-vintage-brown rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-vintage-coffee/60 font-semibold animate-pulse">Memuat data dari database...</p>
            </div>
          ) : error ? (
            <div className="py-16 text-center text-sm font-semibold text-red-700 bg-red-50/50 rounded-lg border border-red-100">
              {error}
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="py-20 text-center space-y-2 bg-vintage-beige/10 rounded-lg border border-dashed border-vintage-brown/20">
              <FiImage className="text-4xl text-vintage-brown/40 mx-auto" />
              <h4 className="font-cinzel text-sm font-bold text-vintage-coffee/80">Tidak Ada Riwayat</h4>
              <p className="text-xs text-vintage-coffee/60 max-w-xs mx-auto">
                {searchQuery || classFilter 
                  ? 'Pencarian Anda tidak menemukan hasil. Coba bersihkan filter.'
                  : 'Belum ada riwayat klasifikasi. Mulailah mengunggah gambar di halaman Klasifikasi.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-vintage-brown/20 shadow-sm">
              <table className="w-full text-left border-collapse bg-vintage-cream/50">
                <thead>
                  <tr className="bg-vintage-brown text-vintage-cream text-xs uppercase tracking-wider font-bold border-b border-vintage-brown">
                    <th className="py-4 px-5 w-16">No</th>
                    <th className="py-4 px-5 w-24">Citra</th>
                    <th className="py-4 px-5">Prediksi</th>
                    <th className="py-4 px-5">Akurasi</th>
                    <th className="py-4 px-5">Tanggal Dibuat</th>
                    <th className="py-4 px-5 w-16 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-vintage-brown/15 text-sm text-vintage-coffee">
                  {currentItems.map((item, idx) => {
                    const rowNumber = indexOfFirstItem + idx + 1;
                    const charDetails = getCharacterDetails(item.prediction);
                    const imageUrl = item.image;
                    
                    return (
                      <tr key={item.id} className="hover:bg-vintage-beige/20 transition duration-150">
                        {/* No */}
                        <td className="py-3 px-5 font-mono text-xs">{rowNumber}</td>
                        
                        {/* Image Thumbnail */}
                        <td className="py-3 px-5">
                          <div 
                            onClick={() => setLightboxImage(imageUrl)}
                            className="w-12 h-12 rounded border border-vintage-brown/30 bg-vintage-cream overflow-hidden flex items-center justify-center cursor-zoom-in hover:border-vintage-gold shadow-sm"
                          >
                            <img
                              src={imageUrl}
                              alt={item.prediction}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://placehold.co/100x100?text=?';
                              }}
                            />
                          </div>
                        </td>

                        {/* Prediction Label */}
                        <td className="py-3 px-5 font-semibold">
                          <div className="flex items-center space-x-3.5">
                            <div className="w-9 h-9 rounded bg-vintage-beige/55 flex items-center justify-center border border-vintage-brown/20 shrink-0">
                              <span className="font-javanese text-xl text-vintage-brown leading-none select-none">
                                {charDetails?.glyph}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-vintage-coffee">Aksara {charDetails?.name}</span>
                              <span className="text-[10px] text-vintage-coffee/50 font-normal leading-tight">
                                {charDetails?.group}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Confidence Percentage */}
                        <td className="py-3 px-5 font-mono font-bold text-vintage-brown">
                          {(item.confidence * 100).toFixed(1)}%
                        </td>

                        {/* Created At Timestamp */}
                        <td className="py-3 px-5 text-xs text-vintage-coffee/75">
                          {new Date(item.created_at).toLocaleString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-5 text-center">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-vintage-brown hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-150"
                            title="Hapus riwayat"
                          >
                            <FiTrash2 className="text-lg" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center bg-vintage-beige/10 p-3 rounded-lg border border-vintage-brown/15 text-xs">
              <span className="font-semibold text-vintage-coffee/70">
                Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredHistory.length)} dari {filteredHistory.length} data
              </span>
              
              <div className="flex space-x-1">
                {/* Prev Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1.5 rounded bg-vintage-cream border border-vintage-brown/30 text-vintage-brown disabled:opacity-40 hover:bg-vintage-beige/30 transition duration-150"
                >
                  <FiChevronLeft className="text-sm" />
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1.5 rounded font-bold transition duration-150 ${
                      currentPage === page
                        ? 'bg-vintage-brown text-vintage-cream border border-vintage-brown'
                        : 'bg-vintage-cream border border-vintage-brown/30 text-vintage-coffee hover:bg-vintage-beige/30'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1.5 rounded bg-vintage-cream border border-vintage-brown/30 text-vintage-brown disabled:opacity-40 hover:bg-vintage-beige/30 transition duration-150"
                >
                  <FiChevronRight className="text-sm" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Lightbox Modal (Click to zoom thumbnail) */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightboxImage(null)}
        >
          <div className="max-w-3xl max-h-[85vh] overflow-hidden bg-vintage-cream rounded-xl p-3 border-4 double border-vintage-brown/80 shadow-2xl">
            <img
              src={lightboxImage}
              alt="Besar aksara"
              className="max-h-[80vh] max-w-full object-contain rounded"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default HistoryPage;
