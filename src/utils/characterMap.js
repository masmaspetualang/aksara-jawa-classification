export const characterMap = {
  ha: { glyph: 'ꦲ', name: 'Ha', meaning: 'Ada utusan / Ada cerita (Ada kehidupan)', group: 'Hana Caraka' },
  na: { glyph: 'ꦤ', name: 'Na', meaning: 'Ada utusan / Ada cerita (Ada kehidupan)', group: 'Hana Caraka' },
  ca: { glyph: 'ꦕ', name: 'Ca', meaning: 'Ada utusan / Ada cerita (Ada kehidupan)', group: 'Hana Caraka' },
  ra: { glyph: 'ꦫ', name: 'Ra', meaning: 'Ada utusan / Ada cerita (Ada kehidupan)', group: 'Hana Caraka' },
  ka: { glyph: 'ꦏ', name: 'Ka', meaning: 'Ada utusan / Ada cerita (Ada kehidupan)', group: 'Hana Caraka' },
  da: { glyph: 'ꦢ', name: 'Da', meaning: 'Saling berselisih pendapat / Bertengkar', group: 'Data Sawala' },
  ta: { glyph: 'ꦠ', name: 'Ta', meaning: 'Saling berselisih pendapat / Bertengkar', group: 'Data Sawala' },
  sa: { glyph: 'ꦱ', name: 'Sa', meaning: 'Saling berselisih pendapat / Bertengkar', group: 'Data Sawala' },
  wa: { glyph: 'ꦮ', name: 'Wa', meaning: 'Saling berselisih pendapat / Bertengkar', group: 'Data Sawala' },
  la: { glyph: 'ꦭ', name: 'La', meaning: 'Saling berselisih pendapat / Bertengkar', group: 'Data Sawala' },
  pa: { glyph: 'ꦥ', name: 'Pa', meaning: 'Sama-sama sakti / Memiliki kesaktian yang sama', group: 'Padha Jayanya' },
  dha: { glyph: 'ꦝ', name: 'Dha', meaning: 'Sama-sama sakti / Memiliki kesaktian yang sama', group: 'Padha Jayanya' },
  ja: { glyph: 'ꦗ', name: 'Ja', meaning: 'Sama-sama sakti / Memiliki kesaktian yang sama', group: 'Padha Jayanya' },
  ya: { glyph: 'ꦪ', name: 'Ya', meaning: 'Sama-sama sakti / Memiliki kesaktian yang sama', group: 'Padha Jayanya' },
  nya: { glyph: 'ꦚ', name: 'Nya', meaning: 'Sama-sama sakti / Memiliki kesaktian yang sama', group: 'Padha Jayanya' },
  ma: { glyph: 'ꦩ', name: 'Ma', meaning: 'Sama-sama menjadi mayat (Pertempuran yang tragis)', group: 'Maga Bathanga' },
  ga: { glyph: 'ꦒ', name: 'Ga', meaning: 'Sama-sama menjadi mayat (Pertempuran yang tragis)', group: 'Maga Bathanga' },
  ba: { glyph: 'ꦧ', name: 'Ba', meaning: 'Sama-sama menjadi mayat (Pertempuran yang tragis)', group: 'Maga Bathanga' },
  tha: { glyph: 'ꦛ', name: 'Tha', meaning: 'Sama-sama menjadi mayat (Pertempuran yang tragis)', group: 'Maga Bathanga' },
  nga: { glyph: 'ꦔ', name: 'Nga', meaning: 'Sama-sama menjadi mayat (Pertempuran yang tragis)', group: 'Maga Bathanga' }
};

export const getCharacterDetails = (key) => {
  if (!key) return null;
  const normalizedKey = key.toLowerCase();
  return characterMap[normalizedKey] || { glyph: 'ꦲ', name: key, meaning: 'Karakter Aksara Jawa', group: '' };
};
