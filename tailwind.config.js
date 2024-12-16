/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          400: '#94a3b8',
          200: '#e2e8f0',
        },
        blue: {
          900: '#1e3a8a',
          700: '#1d4ed8',
          600: '#2563eb',
          400: '#60a5fa',
          300: '#93c5fd',
        },
      },
    },
  },
  plugins: [],
};