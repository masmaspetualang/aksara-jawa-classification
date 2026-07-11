import React, { useState, useRef } from 'react';
import { FiUploadCloud, FiImage, FiCpu, FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import { classifyImage } from '../services/api';
import { getCharacterDetails } from '../utils/characterMap';

const ClassificationPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const fileInputRef = useRef(null);

  // Character rotation list for the loading screen
  const loadingGlyphs = ['ꦲ', 'ꦤ', 'ꦕ', 'ꦫ', 'ꦏ', 'ꦢ', 'ꦠ', 'ꦱ', 'ꦮ', 'ꦭ'];
  const [loadingGlyphIndex, setLoadingGlyphIndex] = useState(0);

  // Set interval to rotate glyphs in loading state
  React.useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingGlyphIndex((prev) => (prev + 1) % loadingGlyphs.length);
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleFileSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar (.png, .jpg, .jpeg)');
      return;
    }
    setError(null);
    setResult(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handlePredict = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await classifyImage(selectedFile);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || 
        err.message ||
        'Terjadi kesalahan saat melakukan klasifikasi. Silakan coba lagi.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 bg-vintage-cream">
      
      {/* Repeating Batik Pattern Background */}
      <div className="absolute inset-0 bg-batik opacity-[0.03] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto z-10 space-y-8">
        
        {/* Page Title */}
        <div className="text-center space-y-2">
          <h2 className="font-cinzel text-3xl font-bold tracking-wider text-vintage-coffee">
            Klasifikasi Aksara
          </h2>
          <p className="text-sm font-playfair italic text-vintage-brown">
            Unggah citra tulisan tangan Aksara Jawa untuk dianalisis
          </p>
          <div className="w-24 h-[1px] bg-vintage-brown mx-auto mt-4"></div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-start space-x-3 max-w-xl mx-auto shadow-sm">
            <FiAlertTriangle className="text-xl mt-0.5 shrink-0 text-red-600" />
            <div className="text-sm">
              <span className="font-semibold">Kesalahan:</span> {error}
            </div>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Upload Card / Preview (Left Column) */}
          <div className="md:col-span-6 bg-vintage-cream p-6 rounded-xl shadow-lg border-2 border-vintage-brown/50">
            <div className="border border-vintage-brown/20 rounded-lg p-4 bg-vintage-beige/10">
              
              {!previewUrl ? (
                // Drag & Drop Upload Zone
                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                    isDragging
                      ? 'border-vintage-gold bg-vintage-beige/35 scale-[0.99]'
                      : 'border-vintage-brown/30 hover:border-vintage-brown hover:bg-vintage-beige/20'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileSelect(e.target.files[0])}
                    className="hidden"
                    accept="image/*"
                  />
                  <FiUploadCloud className="text-5xl text-vintage-brown/70 mb-4 animate-bounce" />
                  <span className="font-bold text-vintage-coffee text-sm">Tarik & Lepas Gambar</span>
                  <span className="text-xs text-vintage-coffee/60 mt-1">atau klik untuk menelusuri berkas</span>
                  <span className="text-[10px] text-vintage-brown/60 uppercase font-semibold mt-4 tracking-wider">
                    PNG, JPG, JPEG (Max 5MB)
                  </span>
                </div>
              ) : (
                // Image Preview Frame
                <div className="space-y-4">
                  <div className="relative max-h-80 rounded-lg overflow-hidden border-4 double border-vintage-brown/60 bg-vintage-cream flex justify-center items-center p-2 shadow-inner">
                    <img
                      src={previewUrl}
                      alt="Pratinjau aksara"
                      className="max-h-64 object-contain rounded"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleReset}
                      disabled={isLoading}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-transparent text-vintage-brown border border-vintage-brown/40 hover:bg-vintage-beige/40 rounded-lg font-semibold text-sm transition duration-200 disabled:opacity-50"
                    >
                      <FiRefreshCw className="mr-2" />
                      <span>Ulangi</span>
                    </button>
                    
                    {!result && (
                      <button
                        onClick={handlePredict}
                        disabled={isLoading}
                        className="flex-2 flex-1 inline-flex items-center justify-center px-4 py-3 bg-vintage-brown text-vintage-cream border border-vintage-gold/30 hover:bg-vintage-coffee rounded-lg font-semibold text-sm shadow-md transition duration-200"
                      >
                        <FiCpu className="mr-2" />
                        <span>Analisis Karakter</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Loading Screen or Result Cards (Right Column) */}
          <div className="md:col-span-6">
            
            {isLoading ? (
              // Loading Screen
              <div className="bg-vintage-cream p-8 rounded-xl shadow-lg border-2 border-vintage-brown/50 min-h-[300px] flex flex-col items-center justify-center space-y-6">
                <div className="w-20 h-20 rounded-full border-4 border-vintage-brown/20 border-t-vintage-brown animate-spin flex items-center justify-center relative">
                  {/* Rotating Javanese Glyph */}
                  <span className="absolute font-javanese text-3xl text-vintage-brown select-none">
                    {loadingGlyphs[loadingGlyphIndex]}
                  </span>
                </div>
                <div className="text-center space-y-1">
                  <h3 className="font-cinzel text-base font-bold text-vintage-coffee animate-pulse">
                    Menganalisis Karakter...
                  </h3>
                  <p className="text-xs text-vintage-coffee/75 font-playfair italic">
                    Memproses segmentasi citra & inferensi MobileNetV2
                  </p>
                </div>
              </div>
            ) : result ? (
              // Prediction Result Card
              <div className="space-y-6">
                
                {/* Main Prediction Details */}
                <div className="bg-vintage-cream p-6 rounded-xl shadow-lg border-2 border-vintage-brown/50 relative overflow-hidden">
                  
                  {/* Watermark Background Character */}
                  <div className="absolute right-[-20px] bottom-[-30px] font-javanese text-[180px] text-vintage-brown/[0.04] select-none pointer-events-none">
                    {getCharacterDetails(result.prediction)?.glyph}
                  </div>

                  <div className="border border-vintage-brown/20 rounded-lg p-5 bg-vintage-beige/25 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                    
                    {/* Giant Character Graphic */}
                    <div className="w-32 h-32 shrink-0 rounded-xl bg-vintage-cream border-4 double border-vintage-brown/70 flex flex-col items-center justify-center shadow-md">
                      <span className="font-javanese text-6xl text-vintage-coffee select-none leading-none mt-1">
                        {getCharacterDetails(result.prediction)?.glyph}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest text-vintage-brown uppercase mt-2 select-none">
                        AKSARANYA
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 text-center sm:text-left space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-vintage-brown tracking-widest leading-none block">
                          Hasil Teratas ({getCharacterDetails(result.prediction)?.group})
                        </span>
                        <h3 className="font-cinzel text-3xl font-extrabold text-vintage-coffee mt-1 leading-none">
                          {getCharacterDetails(result.prediction)?.name}
                        </h3>
                      </div>
                      
                      <div className="flex justify-center sm:justify-start items-baseline gap-1.5">
                        <span className="text-sm font-semibold text-vintage-coffee/70">Akurasi:</span>
                        <span className="text-2xl font-bold text-vintage-brown font-mono">
                          {(result.confidence * 100).toFixed(1)}%
                        </span>
                      </div>

                      <div className="pt-2 border-t border-vintage-brown/15">
                        <span className="text-[10px] uppercase font-bold text-vintage-coffee/50 tracking-wider block">
                          Makna Filosofis:
                        </span>
                        <p className="text-xs text-vintage-coffee/80 italic font-playfair mt-0.5 leading-relaxed">
                          "{getCharacterDetails(result.prediction)?.meaning}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Alternative Predictions */}
                {result.top_predictions && result.top_predictions.length > 0 && (
                  <div className="bg-vintage-cream p-5 rounded-xl shadow-lg border border-vintage-brown/30">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-vintage-coffee/80 mb-3 border-b border-vintage-brown/10 pb-1.5 flex items-center">
                      <FiImage className="mr-1.5" />
                      <span>Kemungkinan Karakter Lain</span>
                    </h4>
                    
                    <div className="space-y-3.5">
                      {result.top_predictions.filter(pred => pred.prediction !== result.prediction).slice(0, 4).map((pred, i) => {
                        const charDetails = getCharacterDetails(pred.prediction);
                        return (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between items-center text-xs font-semibold text-vintage-coffee">
                              <div className="flex items-center space-x-2">
                                <span className="font-javanese text-base leading-none select-none text-vintage-brown">
                                  {charDetails?.glyph}
                                </span>
                                <span>Aksara {charDetails?.name}</span>
                              </div>
                              <span className="font-mono">{(pred.confidence * 100).toFixed(1)}%</span>
                            </div>
                            
                            {/* Custom brown progress bar */}
                            <div className="w-full h-2.5 bg-vintage-beige/55 rounded-full overflow-hidden border border-vintage-brown/10">
                              <div
                                className="h-full bg-vintage-brown rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${pred.confidence * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              // Instructions Card (Default state)
              <div className="bg-vintage-cream p-8 rounded-xl shadow-lg border-2 border-vintage-brown/40 min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-vintage-beige/40 border border-vintage-brown/30 flex items-center justify-center text-vintage-brown">
                  <FiImage className="text-3xl" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-cinzel text-base font-bold text-vintage-coffee">Menunggu Unggahan</h3>
                  <p className="text-xs text-vintage-coffee/70 max-w-[280px] mx-auto">
                    Masukkan gambar di panel kiri dan klik tombol "Analisis Karakter" untuk melihat hasil prediksi karakter.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default ClassificationPage;
