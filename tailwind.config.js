/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          cream: '#FAF5EC',   // Ivory background
          brown: '#8C6239',   // Main accent/button/border
          beige: '#EADDC9',   // Secondary container backgrounds
          coffee: '#36220F',  // Dark text/headings
          gold: '#D4AF37',    // Muted gold highlights/active tabs
        }
      },
      fontFamily: {
        javanese: ['NotoSansJavanese', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
