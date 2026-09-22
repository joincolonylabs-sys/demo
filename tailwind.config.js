/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-cyan': '#2FD9C4',
        'brand-lime': '#D4FF2F',
        'brand-dark': '#0F172A',
        'brand-blue': '#0EA5E9',
      },
    },
  },
  plugins: [],
}
