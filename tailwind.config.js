/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        hand: ['"Dancing Script"', 'cursive'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        wine: '#5b0f2b',
        maroon: '#2a0816',
        plum: '#1a0512',
        neon: '#ff4fa3',
        rose: '#ffc2d9',
      },
      boxShadow: {
        glow: '0 0 24px rgba(255,79,163,0.35), 0 0 60px rgba(255,79,163,0.15)',
        'glow-lg': '0 0 32px rgba(255,79,163,0.55), 0 0 80px rgba(255,79,163,0.25)',
      },
    },
  },
  plugins: [],
}
