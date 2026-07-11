import { supabase } from '../utils/supabaseClient';
import { classifyImageLocal } from '../utils/classifier';

export const classifyImage = async (imageFile) => {
  // 1. Jalankan prediksi klasifikasi secara lokal di browser
  const predResult = await classifyImageLocal(imageFile);

  // 2. Buat nama file unik untuk Supabase Storage
  const fileExt = imageFile.name ? imageFile.name.split('.').pop() : 'png';
  const uniqueId = Math.random().toString(36).substring(2, 15) + Date.now();
  const fileName = `${uniqueId}.${fileExt}`;

  // 3. Unggah gambar ke Supabase Storage bucket 'history-images'
  const { error: uploadError } = await supabase.storage
    .from('history-images')
    .upload(fileName, imageFile, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.error('Gagal mengunggah gambar ke Supabase Storage:', uploadError);
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // 4. Dapatkan Public URL untuk gambar yang diunggah
  const { data: publicUrlData } = supabase.storage
    .from('history-images')
    .getPublicUrl(fileName);

  const publicImageUrl = publicUrlData.publicUrl;

  // 5. Simpan catatan riwayat ke tabel 'prediction_history' di Supabase Database
  const { error: dbError } = await supabase
    .from('prediction_history')
    .insert([
      {
        image_path: publicImageUrl,
        prediction: predResult.prediction,
        confidence: predResult.confidence
      }
    ]);

  if (dbError) {
    console.error('Gagal menyimpan riwayat ke Supabase Database:', dbError);
    throw new Error(`Database insert failed: ${dbError.message}`);
  }

  // 6. Kembalikan data sesuai struktur yang dibutuhkan frontend
  return {
    prediction: predResult.prediction,
    confidence: predResult.confidence,
    class_id: predResult.class_id,
    top_predictions: predResult.top_predictions
  };
};

export const getPredictionHistory = async (search = '') => {
  let query = supabase.from('prediction_history').select('*');

  // Filter teks jika pencarian disediakan
  if (search) {
    query = query.ilike('prediction', `%${search}%`);
  }

  // Urutkan berdasarkan yang terbaru
  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error('Gagal mengambil data dari Supabase:', error);
    throw error;
  }

  // Petakan ke skema data yang diharapkan oleh komponen frontend React
  return data.map((item) => ({
    id: item.id,
    image: item.image_path, // image_path sekarang sudah menyimpan full public URL
    prediction: item.prediction,
    confidence: item.confidence,
    created_at: item.created_at
  }));
};

export const deletePredictionHistoryItem = async (id) => {
  // 1. Ambil nama file dari database untuk dihapus di storage
  const { data: item, error: fetchError } = await supabase
    .from('prediction_history')
    .select('image_path')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Gagal mengambil detail item untuk dihapus:', fetchError);
    throw fetchError;
  }

  // 2. Hapus berkas gambar dari storage bucket jika ada
  if (item && item.image_path) {
    try {
      const fileName = item.image_path.split('/').pop();
      if (fileName) {
        await supabase.storage.from('history-images').remove([fileName]);
      }
    } catch (err) {
      console.warn('Gagal menghapus file dari Storage bucket:', err);
    }
  }

  // 3. Hapus baris data riwayat dari database
  const { error: deleteError } = await supabase
    .from('prediction_history')
    .delete()
    .eq('id', id);

  if (deleteError) {
    console.error('Gagal menghapus data dari database:', deleteError);
    throw deleteError;
  }

  return { message: 'Prediction history item deleted successfully' };
};

