/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        movflix: {
          red: '#E50914',
          dark: '#141414',
          gray: '#2F2F2F',
        },
      },
    },
  },
  plugins: [],
}

